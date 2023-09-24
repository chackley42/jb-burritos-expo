import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const list = () => {
  return (
    <View style={styles.container}>
      <Link style={styles.link} href="/list/1">
        <Text>Item One</Text>
      </Link>
      <Link style={styles.link} href="/list/2">
        <Text>Item Two</Text>
      </Link>
      <Link style={styles.link} href="/list/3">
        <Text>Item Three</Text>
      </Link>
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
  link: {
    marginVertical: 10,
  },
});

export default list;