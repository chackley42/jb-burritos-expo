import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class shoppingCart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Shopping Cart</Text>
        {}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFCE5',
  },
  text: {
    fontSize: 20,
    color: '#000000',
    marginTop: 20,
  },
});

export default shoppingCart;

