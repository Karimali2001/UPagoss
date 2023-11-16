//navegador para las distantas paginas del proceso de registro
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Success from './Success'
import RegisterWithCamera from './RegisterWithCamera'
import Register from './Register'
import RegisterVerification from './RegisterVerification'

const Stack = createStackNavigator()

const RegisterNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Success' component={Success} />
        <Stack.Screen name='RegisterWithCamera' component={RegisterWithCamera} />
        <Stack.Screen name='RegisterVerification' component={RegisterVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RegisterNavigator
