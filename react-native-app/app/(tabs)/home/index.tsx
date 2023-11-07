import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import TruckMapView from '../../../components/TruckMapView';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text>Food Truck's Current Location</Text>
        <View style={styles.map}>
          {/* <TruckMapView /> */}
        </View>
      </View>
      <View style={styles.linksContainer}>
        <View style={styles.link}>
          <Link href="/home/navigate">
            <Text style={styles.linkText}>Navigate</Text>
          </Link>
        </View>
        <View style={styles.link}>
          <Link href="/home/order">
            <Text style={styles.linkText}>Place an Order</Text>
          </Link>
        </View>
        <View style={styles.link}>
          <Link href="/home/cater">
            <Text style={styles.linkText}>Cater</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '80%',
    height: '60%',
    aspectRatio: 1,
  },
  linksContainer: {
    width: '100%',
  },
  link: {
    padding: 10,
    backgroundColor: '#515D52',
    borderRadius: 8,
    marginBottom: 10,
    width: '60%', // Limit the button width to 80% of the container
    alignSelf: 'center', // Center the button horizontally
    justifyContent: 'center', // Center the button vertically
  },
  linkText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text inside the button
  },
});

export default Home;