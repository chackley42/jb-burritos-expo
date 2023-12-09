import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link, Stack } from 'expo-router';
import {formatDate} from './index'
import handleNavigation from '../home/index'
import iosLocalHost from '../../../utils/testingConsts';
import { useState, useEffect } from 'react';

const NotificationsOrderStatus = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [truckLocation, setTruckLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  const fetchTruckLocation = async () => {
    try {
      const response = await fetch(`${iosLocalHost}/api/getTruckLocation`);
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
  
  const handleNavigation = async () => {
    await fetchTruckLocation();
    const userLocation = { latitude: 40.231708, longitude: -111.658480 };
    const destination = `${truckLocation.latitude},${truckLocation.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open Google Maps or a browser with the navigation link
    Linking.openURL(url);
  };

  useEffect(() => {
    // Fetch the initial truck location when the component mounts
    fetchTruckLocation();
  }, []); // Empty dependency array ensures this effect runs only once


  // Get the selected order from route.params
  const { order } = route.params;

  return (
    <View style={{ flex: 1 }}>
    <ScrollView>
      <Stack.Screen options={{title: 'Order Details', headerStyle: {backgroundColor: '#F8E435'}}}/>
      <View>
      <View style={[styles.subTab]}>
        <Text style={styles.subTabTextTitle}>Order# {order._id}</Text>
        <Text style={styles.subTabText}>Placed on {formatDate(order.createdAt)}</Text>
        {/* Display other order details as needed */}
        </View>
        {order.items.map((item, index) => (
          <View key={index} style={[styles.subTab]}>
            <Text style={styles.subTabText}>Item: {item.name}</Text>
            <Text style={styles.subTabText}>Qty: {item.quantity}</Text>
            <Text style={styles.subTabText}>Total Item Price: {item.price}</Text>

          </View>
        ))} 
        <View style={[styles.subTab]}>
          <Text style={styles.subTabText}>Subtotal: {order.subtotal}</Text>
          <Text style={styles.subTabText}>Taxes: {order.tax}</Text>
          <Text style={styles.subTabText}>Paid Order Total: {order.total}</Text>
          </View>
        </View>
      {}
    </ScrollView>
    <View style={styles.bottomTab}>
    <TouchableOpacity onPress={handleNavigation}>
      <View style={styles.foodTruckButton}>
        <Text style={styles.foodTruckButtonText} onPress={handleNavigation}>Navigate to Food Truck</Text>
      </View>
    </TouchableOpacity>
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  container2: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 30,
    width: '100%',
    alignItems: 'flex-start',
  },
  container3: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 30,
    width: '100%',
    alignItems: 'flex-start',
  },
  tab: {
    backgroundColor: '#F8E435',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  tabText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subTab: {
    backgroundColor: '#FFFCE5',
    padding: 20,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  subTabTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subTabText: {
    fontSize: 20,
    color: 'black',
  },
  bottomTab: {
    backgroundColor: '#F8E435',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  navigateButton: {
    backgroundColor: '#515D52',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  navigateButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  foodTruckButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  foodTruckButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },

});

export default NotificationsOrderStatus;