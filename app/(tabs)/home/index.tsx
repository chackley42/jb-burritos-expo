//rnfe to generate name of file component

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
      {}
      <Link href="/home/navigate" style={styles.link}>
        <Text style={styles.linkText}>Navigate</Text>
      </Link>
      <Link href="/home/order" style={styles.link}>
        <Text style={styles.linkText}>Place an Order</Text>
      </Link>
      <Link href="/home/cater" style={styles.link}>
        <Text style={styles.linkText}>Cater</Text>
      </Link>
    </View>
  );
};

const styles = {
  link: {
    padding: 10,
    backgroundColor: '#515D52',
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default Home;