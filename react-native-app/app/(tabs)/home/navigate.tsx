import React from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Navigate = () => {
  const userLocation = { latitude: 40.231708, longitude: -111.658480 };
  const truckLocation = { latitude: 40.2778, longitude: -111.7131 };

  const handleNavigation = () => {
    const destination = `${truckLocation.latitude},${truckLocation.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open Google Maps or a browser with the navigation link
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <MapViewDirections
          origin={userLocation}
          destination={truckLocation}
          apikey="" //Removed, add again if needed
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Navigate to Truck" onPress={handleNavigation} />
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
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default Navigate;
