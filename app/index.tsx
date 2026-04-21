import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Camera, useCameraDevice, useCameraPermission, useFrameOutput } from 'react-native-vision-camera'
import { useTensorflowModel } from 'react-native-fast-tflite'
import { useResizer } from 'react-native-vision-camera-resizer'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import RNFS from 'react-native-fs'

const { width: SW, height: SH } = Dimensions.get('window')

// ── Anchors ───────────────────────────────────────────────────────────────────
// stride 8  → 16×16 grid × 2 anchors = 512
// stride 16 → 8×8  grid × 6 anchors = 384
// total = 896
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

// ── Worklet helpers ───────────────────────────────────────────────────────────
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

// ── Component ─────────────────────────────────────────────────────────────────
export default function Index() {
  const [boxes, setBoxes] = useState<Box[]>([])
  const [previewSize, setPreviewSize] = useState({ width: SW, height: SH })
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 1, height: 1 })

  const objectDetection = useTensorflowModel(
    require('./models/blaze_face_short_range.tflite'),[]
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

  const frameOutput = useFrameOutput({
    pixelFormat: 'yuv',
    enablePhysicalBufferRotation: true,
    onFrame(frame) {
      'worklet'
      if (!resizer || !model) { frame.dispose(); return }

      const imageWidth  = frame.width
      const imageHeight = frame.height

      // const resized = resizer.resize(frame)
      // const pixels  = resized.getPixelBuffer()
      // const outputs = model.runSync([pixels])

      const resized   = resizer.resize(frame)
      const rawPixels = resized.getPixelBuffer()
      const raw       = new Float32Array(rawPixels as unknown as ArrayBuffer)

      // Normalize [0,1] → [-1,1] to match Python preprocessing
      const normalized = new Float32Array(raw.length)
      for (let i = 0; i < raw.length; i++) {
        normalized[i] = raw[i] * 2.0 - 1.0
      }

      const outputs = model.runSync([normalized.buffer])

      resized.dispose()
      frame.dispose()

      // outputs[0] = regressors [896, 16]
      // outputs[1] = scores     [896, 1]
      const regressors = new Float32Array(outputs[0] as ArrayBuffer)
      const scores = new Float32Array(outputs[1] as ArrayBuffer)

      const THRESHOLD  = 0.75  // official MediaPipe threshold for short range
      const NMS_THRESH = 0.5

      const rx1: number[] = []
      const ry1: number[] = []
      const rx2: number[] = []
      const ry2: number[] = []
      const rsc: number[] = []

      for (let i = 0; i < 896; i++) {
        const score = sigmoid(scores[i])
        if (score < THRESHOLD) continue

        // const regIdx = i - 1  // even neighbor for regressors and anchor
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

      // NMS
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
          ) > NMS_THRESH) {
            suppressed[j] = true
          }
        }
      }

      const best = result.length > 0 ? [result[0]] : []

      runOnJS(setImageSize)({ width: imageWidth, height: imageHeight })
      runOnJS(setBoxes)(best)
    }
  })

  useEffect(() => {
    if (!hasPermission) requestPermission()
  }, [hasPermission])

  if (!device) return <View><Text>No camera device found</Text></View>

  // Matches OverlayView.kt scaleFactor logic exactly
  const scaleFactor = Math.min(
    previewSize.width  / imageSize.width,
    previewSize.height / imageSize.height
  )

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
      {boxes.map((box, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left:   box.x1 * scaleFactor,
            top:    box.y1 * scaleFactor,
            width:  (box.x2 - box.x1) * scaleFactor,
            height: (box.y2 - box.y1) * scaleFactor,
            borderWidth: 2,
            borderColor: 'red',
          }}
        />
      ))}
    </View>
  )
}