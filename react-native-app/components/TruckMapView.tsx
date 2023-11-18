import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
export default function TruckMapView() {
  const initialRegion = {
    latitude: 40.5622, // Latitude for the center between Utah County and Salt Lake County
    longitude: -111.9297, // Longitude for the center between Utah County and Salt Lake County
    latitudeDelta: 1.0, // Zoom level
    longitudeDelta: 1.0, // Zoom level
  };

  const truckLocation = {
    latitude: 40.2778, // Latitude of UVU
    longitude: -111.7131, // Longitude of UVU
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={initialRegion}
      >
        {/* Add Marker for UVU's Location */}
        <Marker coordinate={truckLocation} title="TRUCk" description="Utah Valley University" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
