import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import TruckMapView from '../../../components/TruckMapView';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text style={styles.navigateText}>Food Truck's Current Location</Text>
        <View style={styles.map}>
          {/* <TruckMapView /> */}
          <Text style={styles.navigateText}>Operating Hours: </Text>
          <Text style={styles.navigateText}>9AM - 5PM | Monday - Friday</Text>
        </View>
      </View>
      <View style={styles.linksContainer}>
        <View style={styles.link}>
          <Link href="/home/navigate">
            <Text style={styles.linkText}>Navigate to Food Truck</Text>
          </Link>
        </View>
        <View style={styles.link}>
          <Link href="/home/order">
            <Text style={styles.linkText}>View Menu</Text>
          </Link>
        </View>
        <View style={styles.link}>
          <Link href="/home/cater">
            <Text style={styles.linkText}>Catering Requests</Text>
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
    height: '65%',
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
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  navigateText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default Home;
