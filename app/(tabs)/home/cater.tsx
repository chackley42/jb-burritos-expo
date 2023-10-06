import { View, Text } from 'react-native'
import React from 'react'
import CaterForm from '../../../components/CaterForm'
import Logo from '../../../components/Logo'
import { Link, Stack } from 'expo-router';

const cater = () => {
  return (
    <View>
      <Stack.Screen options={{title: 'Cater', headerStyle: {     backgroundColor: '#F8E435'}}}/>
      <Text>cater</Text>
      <CaterForm></CaterForm>
    </View>
  )
}

export default cater