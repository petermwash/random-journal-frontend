import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="login/index" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="register/index" options={{ headerTitle: "Register" }} />
      <Stack.Screen name="journal/index" options={{ headerTitle: "Write Your Journal" }} />
    </Stack>
  )
}

export default RootLayout;
