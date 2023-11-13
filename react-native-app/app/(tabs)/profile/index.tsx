import { Text, View, ScrollView} from 'react-native'
import React, { Component } from 'react'
import LoginScreen from '../../../components/LoginScreen'

export class profile extends Component {
  render() {
    return (
      <ScrollView>
        <LoginScreen></LoginScreen>
      </ScrollView>
    )
  }
}

export default profile;
