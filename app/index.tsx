import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameOutput,
} from 'react-native-vision-camera'

import { useTensorflowModel } from 'react-native-fast-tflite'
import { useResizer } from 'react-native-vision-camera-resizer'
import { runOnJS } from 'react-native-reanimated'

export default function Index() {
  const objectDetection = useTensorflowModel(require('./models/blaze_face_short_range.tflite'), [])
  const model = objectDetection.state === 'loaded' ? objectDetection.model : undefined
  // const { resize } = useResizePlugin()

  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')

  const { resizer } = useResizer({
    width: 128,
    height: 128,
    channelOrder: 'rgb',
    dataType: 'float32',
    pixelLayout: 'planar',
    scaleMode: 'cover', // contain or 'cover'
  })
  if (!resizer) return

  const frameOutput = useFrameOutput({
    pixelFormat: 'yuv',
    onFrame(frame) {
      'worklet'

      const resized = resizer.resize(frame)
      const pixels = resized.getPixelBuffer()

      console.log(resized.width, resized.height)
      // console.log(`Received ${frame.width}x${frame.height} Frame!`)
      resized.dispose()
      frame.dispose()
    }
  })

  useEffect(() => {
    const run = async () => {
      if (!hasPermission) {
        await requestPermission()
      }
    }

    run()
  }, [hasPermission])

  if (!device) {
    return (
      <View>
        <Text>No camera device found</Text>
      </View>
    )
  }

  return (
    <Camera
      style={{ flex: 1 }}
      device={device}
      isActive={true}
      outputs={[frameOutput]}
    />
  )
}