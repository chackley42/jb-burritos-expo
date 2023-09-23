//rnfe to generate name of file component

import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const home = () => {
  return (
    <View style = {{ flex: 1, justifyContent: 'space-around', alignItems: 'center',}}>
      <Link href="/home/navigate">Navigate</Link>
      <Link href="/home/order">Order</Link>
      <Link href="/home/cater">Cater</Link>
    </View>
  )
}

export default home