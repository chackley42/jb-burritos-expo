import { Text, View, ScrollView, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import LoginScreen from '../../../components/LoginScreen'

export class profile extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.centeredContainer}>
        <Image
              source={require('../../../assets/user-icon.jpeg')}
              style={styles.userIcon}
            />
            </View>
        <LoginScreen></LoginScreen>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
  },
  userIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default profile;
