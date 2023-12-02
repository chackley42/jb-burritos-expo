import React from 'react';
import { View, Text, StyleSheet, Scrollview, Button, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import TruckMapView from '../../../components/TruckMapView';

export const handleNavigation = () => {
  const userLocation = { latitude: 40.231708, longitude: -111.658480 };
  const truckLocation = { latitude: 40.2778, longitude: -111.7131 };
  const destination = `${truckLocation.latitude},${truckLocation.longitude}`;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  
  // Open Google Maps or a browser with the navigation link
  Linking.openURL(url);
};

 const Home = () => {
  
  return (
    <View style={styles.container}>
      
      <View style={styles.mapContainer}>
        <Text style={styles.navigateText}>Food Truck's Current Location</Text>
        <View style={styles.map}>
          <TruckMapView />
          
        </View>
      </View>
      <KeyboardAvoidingView
      style={{ flex: 0.5 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      </KeyboardAvoidingView>
      <View style={styles.linksContainer}>
      <View>
        <Text style={styles.navigateText}>Operating Hours: </Text>
          <Text style={styles.navigateText}>9AM - 5PM | Monday - Friday</Text>
        </View>
        <View style={styles.link}>
          
            <Text style={styles.linkText} onPress={handleNavigation}>Navigate to Food Truck</Text>
          
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
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
