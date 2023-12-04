import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import iosLocalHost from '../utils/testingConsts';
import { useAdminContext } from '../utils/AdminContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TruckMapView() {
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

  const { isAdmin, setAdminStatus } = useAdminContext();
  async function fetchIsAdmin() {
    try {
      const isAdminValue = await AsyncStorage.getItem('isAdmin');
      if (isAdminValue !== null) {
        setAdminStatus(isAdminValue === 'true');
      }
    } catch (error) {
      console.error('Error retrieving isAdmin from AsyncStorage:', error);
    }
  }

  useEffect(() => {
    fetchIsAdmin();
  }, [isAdmin]);

  useEffect(() => {
    fetchTruckLocation();
  }, []);

  const fetchTruckLocation = async () => {
    try {
      const response = await fetch(`${iosLocalHost}:8080/api/getTruckLocation`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const truckLocationData = await response.json();
      setTruckLocation({
        latitude: truckLocationData.latitude,
        longitude: truckLocationData.longitude,
      });
    } catch (error) {
      console.error('Error fetching truck location:', error);
    }
  };

  const handleLocationChange = (data, details) => {
    const { geometry } = details;
    if (geometry) {
      const { location } = geometry;
      setTruckLocation({
        latitude: location.lat,
        longitude: location.lng,
      });
    }
  };

  const handleChangeLocation = async () => {
    try {
      const response = await fetch(`${iosLocalHost}:8080/api/updateTruckLocation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: truckLocation.latitude,
          longitude: truckLocation.longitude,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Truck location updated successfully');
    } catch (error) {
      console.error('Error updating truck location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={initialRegion}
      >
        <Marker coordinate={truckLocation} title="TRUCK" description="Utah Valley University" />
      </MapView>

      {isAdmin && (
        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            placeholder="Enter new address or location"
            onPress={handleLocationChange}
            query={{
              key: 'AIzaSyCkGJZl-UcuxlyW9cQnJ1N7r-HHkeTVRNo',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              container: {
                flex: 0,
              },
              textInputContainer: {
                width: '100%',
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />

          <Button title="Change Location" onPress={handleChangeLocation} />
        </View>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
});
