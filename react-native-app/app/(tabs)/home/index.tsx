import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native'; // Import StyleSheet
import { Link } from 'expo-router';
import TruckMapView from '../../../components/TruckMapView';

const Home = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Food Truck's Current Location</Text>
        <TruckMapView></TruckMapView>
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
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
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
});

export default Home;
