import { Text, View } from 'react-native'
import React, { Component } from 'react'
import LoginScreen from '../../../components/LoginScreen'
import RegistrationScreen from './RegistrationScreen'

export class register extends Component {
  render() {
    return (
      <View>
        <RegistrationScreen></RegistrationScreen>
      </View>
    )
  }
}

export default register;