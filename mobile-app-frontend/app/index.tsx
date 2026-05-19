import React, { useEffect, useState, useRef, useCallback } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Camera, useCameraDevice, useCameraPermission, useFrameOutput } from 'react-native-vision-camera'
import { useTensorflowModel } from 'react-native-fast-tflite'
import { useResizer } from 'react-native-vision-camera-resizer'
import { runOnJS } from 'react-native-reanimated'

const { width: SW, height: SH } = Dimensions.get('window')

// ── Your existing backend IP ──────────────────────────────────────────────────
const BACKEND_WS_URL = 'ws://192.168.1.2:8000'  // replace with your IP

// ── Anchors (your existing code, unchanged) ───────────────────────────────────
const ANCHORS = (() => {
  const anchors: { x: number; y: number }[] = []
  const layers = [
    { stride: 8,  anchorsPerCell: 2 },
    { stride: 16, anchorsPerCell: 6 },
  ]
  for (const { stride, anchorsPerCell } of layers) {
    const gridSize = 128 / stride
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        for (let a = 0; a < anchorsPerCell; a++) {
          anchors.push({
            x: (col + 0.5) / gridSize,
            y: (row + 0.5) / gridSize,
          })
        }
      }
    }
  }
  return anchors
})()

function sigmoid(x: number): number {
  'worklet'
  return 1 / (1 + Math.exp(-x))
}

function iou(
  ax1: number, ay1: number, ax2: number, ay2: number,
  bx1: number, by1: number, bx2: number, by2: number
): number {
  'worklet'
  const ix1 = ax1 > bx1 ? ax1 : bx1
  const iy1 = ay1 > by1 ? ay1 : by1
  const ix2 = ax2 < bx2 ? ax2 : bx2
  const iy2 = ay2 < by2 ? ay2 : by2
  const interW = ix2 - ix1
  const interH = iy2 - iy1
  if (interW <= 0 || interH <= 0) return 0
  const inter = interW * interH
  const aArea = (ax2 - ax1) * (ay2 - ay1)
  const bArea = (bx2 - bx1) * (by2 - by1)
  return inter / (aArea + bArea - inter)
}

type Box = { x1: number; y1: number; x2: number; y2: number }
type ImageSize = { width: number; height: number }
type LivenessState = 'idle' | 'connecting' | 'challenge' | 'passed' | 'failed'

export default function Index() {
  const [boxes, setBoxes]               = useState<Box[]>([])
  const [previewSize, setPreviewSize]   = useState({ width: SW, height: SH })
  const [imageSize, setImageSize]       = useState<ImageSize>({ width: 1, height: 1 })
  const [faceReady, setFaceReady]       = useState(false)

  // ── Liveness state ──────────────────────────────────────────────────────────
  const [livenessState, setLivenessState]         = useState<LivenessState>('idle')
  const [currentChallenge, setCurrentChallenge]   = useState<string>('')
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [livenessToken, setLivenessToken]         = useState<string>('')
  const [statusMessage, setStatusMessage]         = useState('Position your face in the frame')

  const wsRef          = useRef<WebSocket | null>(null)
  const streamInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastFrameRef   = useRef<string | null>(null)  // stores latest frame as base64

  // ── BlazeFace model (your existing code) ────────────────────────────────────
  const objectDetection = useTensorflowModel(
    require('./models/blaze_face_short_range.tflite'), []
  )
  const model = objectDetection.state === 'loaded' ? objectDetection.model : undefined

  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('front')

  const { resizer } = useResizer({
    width: 128,
    height: 128,
    channelOrder: 'rgb',
    dataType: 'float32',
    pixelLayout: 'interleaved',
    scaleMode: 'cover',
  })

  // ── Check if face is centered ────────────────────────────────────────────────
  const isFaceCentered = (box: Box, imgW: number, imgH: number): boolean => {
    'worklet'
    const faceCx = (box.x1 + box.x2) / 2
    const faceCy = (box.y1 + box.y2) / 2
    const faceW  = box.x2 - box.x1
    const faceH  = box.y2 - box.y1

    const centerX = imgW / 2
    const centerY = imgH / 2

    const isCentered  = Math.abs(faceCx - centerX) < imgW * 0.2 &&
                        Math.abs(faceCy - centerY) < imgH * 0.2
    const isLargeEnough = faceW > imgW * 0.2 && faceH > imgH * 0.2
    const isNotTooClose = faceW < imgW * 0.8

    return isCentered && isLargeEnough && isNotTooClose
  }

  // ── Connect WebSocket to FastAPI ─────────────────────────────────────────────
  const connectWebSocket = useCallback(() => {
    if (wsRef.current) return  // already connected

    const sessionId = `session_${Date.now()}`
    const ws = new WebSocket(`${BACKEND_WS_URL}/ai/ws/liveness/${sessionId}`)
    wsRef.current = ws

    setLivenessState('connecting')
    setStatusMessage('Connecting...')

    ws.onopen = () => {
      console.log('WebSocket connected')
      setLivenessState('challenge')
      startStreamingFrames()
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('Received:', data)

      switch (data.type) {
        case 'challenge_start':
          setCurrentChallenge(data.current)
          setStatusMessage(getChallengeText(data.current))
          break

        case 'progress':
          setCompletedChallenges(data.completed)
          if (data.next) {
            setCurrentChallenge(data.next)
            setStatusMessage(getChallengeText(data.next))
          }
          break

        case 'passed':
          setLivenessState('passed')
          setLivenessToken(data.token)
          setStatusMessage('Liveness passed!')
          stopStreamingFrames()
          ws.close()
          break

        case 'failed':
          setLivenessState('failed')
          setStatusMessage(`Failed: ${data.reason}`)
          stopStreamingFrames()
          ws.close()
          break
      }
    }

    ws.onerror = (error) => {
      console.log('WebSocket error:', error)
      setStatusMessage('Connection error')
      setLivenessState('failed')
    }

    ws.onclose = () => {
      console.log('WebSocket closed')
      wsRef.current = null
    }
  }, [])

  // ── Stream frames to backend at 5fps ─────────────────────────────────────────
  const startStreamingFrames = () => {
    if (streamInterval.current) return

    streamInterval.current = setInterval(() => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
      if (!lastFrameRef.current) return

      // Send frame as base64 JPEG string
      wsRef.current.send(JSON.stringify({
        type: 'frame',
        data: lastFrameRef.current
      }))
    }, 200)  // 5fps
  }

  const stopStreamingFrames = () => {
    if (streamInterval.current) {
      clearInterval(streamInterval.current)
      streamInterval.current = null
    }
  }

  // ── Human readable challenge text ────────────────────────────────────────────
  const getChallengeText = (challenge: string): string => {
    switch (challenge) {
      case 'blink':      return 'Please blink'
      case 'turn_left':  return 'Turn your head left'
      case 'turn_right': return 'Turn your head right'
      case 'smile':      return 'Please smile'
      default:           return challenge
    }
  }

  // ── Frame processor (your existing BlazeFace code + new logic) ───────────────
  const frameOutput = useFrameOutput({
    pixelFormat: 'yuv',
    enablePhysicalBufferRotation: true,
    onFrame(frame) {
      'worklet'
      if (!resizer || !model) { frame.dispose(); return }

      const imageWidth  = frame.width
      const imageHeight = frame.height

      const resized     = resizer.resize(frame)
      const rawPixels   = resized.getPixelBuffer()
      const raw         = new Float32Array(rawPixels as unknown as ArrayBuffer)

      const normalized  = new Float32Array(raw.length)
      for (let i = 0; i < raw.length; i++) {
        normalized[i] = raw[i] * 2.0 - 1.0
      }

      const outputs    = model.runSync([normalized.buffer])
      resized.dispose()
      frame.dispose()

      const regressors = new Float32Array(outputs[0] as ArrayBuffer)
      const scores     = new Float32Array(outputs[1] as ArrayBuffer)

      const THRESHOLD  = 0.75
      const NMS_THRESH = 0.5

      const rx1: number[] = []
      const ry1: number[] = []
      const rx2: number[] = []
      const ry2: number[] = []
      const rsc: number[] = []

      for (let i = 0; i < 896; i++) {
        const score = sigmoid(scores[i])
        if (score < THRESHOLD) continue

        const anchor = ANCHORS[i]
        const off    = i * 16

        const cy = regressors[off]     / 128 + anchor.y
        const cx = regressors[off + 1] / 128 + anchor.x
        const h  = regressors[off + 2] / 128
        const w  = regressors[off + 3] / 128

        rx1.push((cx - w / 2) * imageWidth)
        ry1.push((cy - h / 2) * imageHeight)
        rx2.push((cx + w / 2) * imageWidth)
        ry2.push((cy + h / 2) * imageHeight)
        rsc.push(score)
      }

      const suppressed = new Array(rx1.length).fill(false)
      const result: Box[] = []

      for (let i = 0; i < rx1.length; i++) {
        if (suppressed[i]) continue
        result.push({ x1: rx1[i], y1: ry1[i], x2: rx2[i], y2: ry2[i] })
        for (let j = i + 1; j < rx1.length; j++) {
          if (suppressed[j]) continue
          if (iou(
            rx1[i], ry1[i], rx2[i], ry2[i],
            rx1[j], ry1[j], rx2[j], ry2[j]
          ) > NMS_THRESH) suppressed[j] = true
        }
      }

      const best = result.length > 0 ? [result[0]] : []

      // Check if face is centered and ready
      const centered = best.length > 0 &&
        isFaceCentered(best[0], imageWidth, imageHeight)

      runOnJS(setImageSize)({ width: imageWidth, height: imageHeight })
      runOnJS(setBoxes)(best)
      runOnJS(setFaceReady)(centered)
    }
  })

  // ── Auto connect when face is centered ───────────────────────────────────────
  useEffect(() => {
    if (faceReady && livenessState === 'idle') {
      connectWebSocket()
    }
  }, [faceReady, livenessState])

  // ── Cleanup on unmount ───────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopStreamingFrames()
      wsRef.current?.close()
    }
  }, [])

  useEffect(() => {
    if (!hasPermission) requestPermission()
  }, [hasPermission])

  if (!device) return <View><Text>No camera device found</Text></View>

  const scaleFactor = Math.min(
    previewSize.width  / imageSize.width,
    previewSize.height / imageSize.height
  )

  const boxColor = livenessState === 'passed' ? 'green'
                 : livenessState === 'failed' ? 'red'
                 : faceReady ? 'yellow' : 'red'

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        outputs={[frameOutput]}
        onLayout={(e) => setPreviewSize({
          width:  e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        })}
      />

      {/* Bounding boxes */}
      {boxes.map((box, i) => (
        <View
          key={i}
          style={{
            position:    'absolute',
            left:        box.x1 * scaleFactor,
            top:         box.y1 * scaleFactor,
            width:       (box.x2 - box.x1) * scaleFactor,
            height:      (box.y2 - box.y1) * scaleFactor,
            borderWidth: 2,
            borderColor: boxColor,
          }}
        />
      ))}

      {/* Status message */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{statusMessage}</Text>
      </View>

      {/* Challenge progress */}
      {livenessState === 'challenge' && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedChallenges.length} of 3 completed
          </Text>
        </View>
      )}

      {/* Success message */}
      {livenessState === 'passed' && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>✓ Liveness Verified</Text>
          <Text style={styles.tokenText}>Token: {livenessToken}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  statusContainer: {
    position:        'absolute',
    bottom:          100,
    left:            0,
    right:           0,
    alignItems:      'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding:         12,
  },
  statusText: {
    color:    'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    position:        'absolute',
    top:             50,
    left:            0,
    right:           0,
    alignItems:      'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding:         8,
  },
  progressText: {
    color:    'white',
    fontSize: 14,
  },
  successContainer: {
    position:        'absolute',
    top:             120,
    left:            20,
    right:           20,
    alignItems:      'center',
    backgroundColor: 'rgba(0,128,0,0.8)',
    padding:         16,
    borderRadius:    12,
  },
  successText: {
    color:      'white',
    fontSize:   20,
    fontWeight: 'bold',
  },
  tokenText: {
    color:    'white',
    fontSize: 10,
    marginTop: 4,
  },
})