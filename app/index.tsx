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

export default function Index() {
  const objectDetection = useTensorflowModel(require('./models/blaze_face_short_range.tflite'), [])
  const model = objectDetection.state === 'loaded' ? objectDetection.model : undefined

  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('front')

  // When trying to run this app, run this on a physical devices instead of an emulator
  // The resizer returns as undefined since Resizer pipeline requires Vulkan extensions (VK_ANDROID_external_memory_android_hardware_buffer).
  // Which is only available on Android 8.0+. Android emulators frequently don't support these extensions
  // Therefore making the frameOutput not run properly
  const { resizer } = useResizer({
    width: 128,
    height: 128,
    channelOrder: 'rgb',
    dataType: 'float32',
    pixelLayout: 'interleaved',
    scaleMode: 'cover', // contain or 'cover'
  })

  const frameOutput = useFrameOutput({
    pixelFormat: 'yuv',
    enablePhysicalBufferRotation: false,
    onFrame(frame) {
      'worklet'

      if (!resizer || !model) {
        if (!resizer && !model) {
          console.log("Resizer and model are undefined")
        } else if (!resizer) {
          console.log("Resizer is undefined")
        } else {
          console.log("Model is not loaded yet")
        }

        frame.dispose()
        return
      }

      const resized = resizer.resize(frame)
      const pixels = resized.getPixelBuffer()

      const outputs = model.runSync([pixels])


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