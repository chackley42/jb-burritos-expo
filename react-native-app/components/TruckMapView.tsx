import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import iosLocalHost from '../utils/testingConsts';

export default function TruckMapView() {
  const initialRegion = {
    latitude: 40.5622,
    longitude: -111.9297,
    latitudeDelta: 1.0,
    longitudeDelta: 1.0,
  };

  const [truckLocation, setTruckLocation] = useState({
    latitude: 40.2778,
    longitude: -111.7131,
  });

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
  
      // Optionally, you can handle success or show a message to the user
      console.log('Truck location updated successfully');
    } catch (error) {
      console.error('Error updating truck location:', error);
      // Handle error, show an error message, etc.
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

          <Button title="Change Location" onPress={() => {handleChangeLocation()}} />
        </View>
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
