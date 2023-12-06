import { Text, View, ScrollView, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import LoginScreen from '../../../components/LoginScreen'
import RegistrationScreen from './RegistrationScreen'
import { Link, Stack } from 'expo-router';

export class AboutUs extends Component {
  render() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'About Us', headerStyle: { backgroundColor: '#F8E435' } }} />
        <Text>2023 JB Burritos</Text>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
      },
})

export default AboutUs;