import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera'

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')

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
    />
  )
}