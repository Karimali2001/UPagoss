//navegador para las distantas paginas del proceso de registro
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Success from './Success'
import Delete from './Delete'
import Register from './Register'

const Stack = createStackNavigator()

const RegisterNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Success' component={Success} />
        <Stack.Screen name='Delete' component={Delete} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RegisterNavigator
