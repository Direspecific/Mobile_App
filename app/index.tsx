import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameOutput,
} from 'react-native-vision-camera'

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')
  const frameOutput = useFrameOutput({
    onFrame(frame) {
      'worklet'
      console.log(`Received ${frame.width}x${frame.height} Frame!`)
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