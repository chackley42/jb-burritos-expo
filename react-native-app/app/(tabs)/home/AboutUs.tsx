import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import React, { Component } from 'react';
import { Stack } from 'expo-router';

export class AboutUs extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'About Us', headerStyle: { backgroundColor: '#F5A800' } }} />
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>&copy;2023 JB Burritos</Text>
        <Text style={styles.description}>
          Welcome to JB Burritos, the ultimate destination for mouthwatering breakfast burritos on wheels!
          Our food truck is dedicated to serving you the most delicious and satisfying breakfast options,
          crafted with love and premium ingredients. Whether you're a local looking for a quick morning bite
          or a visitor eager to experience the flavors of JB, our burritos are sure to tantalize your taste buds.
          Join us on a culinary journey where every bite tells a story of flavor, freshness, and pure breakfast bliss!
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    lineHeight: 24,
    color: '#555',
  },
});

export default AboutUs;