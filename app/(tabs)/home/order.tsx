import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const order = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order</Text>
      {}
    </View>
  );
};

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

export default order;