import React from 'react';
import { View, Text, StyleSheet, Scrollview, Button, Linking, KeyboardAvoidingView, Platform} from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import TruckMapView from '../../../components/TruckMapView';
import iosLocalHost from '../../../utils/testingConsts';
import { useAdminContext } from '../../../utils/AdminContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


 const Home = () => {

  const initialRegion = {
    latitude: 40.5622,
    longitude: -111.9297,
    latitudeDelta: 1.0,
    longitudeDelta: 1.0,
  };

  const [truckLocation, setTruckLocation] = useState({
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude
  });



  useEffect(() => {
    // Fetch the initial truck location when the component mounts
    fetchTruckLocation();
  }, []); // Empty dependency array ensures this effect runs only once

  


  const fetchTruckLocation = async () => {
    try {
      const response = await fetch(`${iosLocalHost}:8080/api/getTruckLocation`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const truckLocationData = await response.json();
      console.log(JSON.stringify(truckLocation))
      setTruckLocation({
        latitude: truckLocationData.latitude,
        longitude: truckLocationData.longitude,
      });
    } catch (error) {
      console.error('Error fetching truck location:', error);
    }
  };

  

 const handleNavigation = async () => {
    await fetchTruckLocation();

    const userLocation = { latitude: 40.231708, longitude: -111.658480 };
    const destination = `${truckLocation.latitude},${truckLocation.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open Google Maps or a browser with the navigation link
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.mapContainer}>
        <Text style={styles.navigateText}>Food Truck's Current Location</Text>
        <Text style={styles.navigateText}>Currently near: </Text>
        <View style={styles.map}>
          <TruckMapView />
          
        </View>
      </View>
      <KeyboardAvoidingView
      
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}
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
