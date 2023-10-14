import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

const navigate = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Navigate', headerStyle: {     backgroundColor: '#F8E435'}}}/>
      
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

export default navigate;