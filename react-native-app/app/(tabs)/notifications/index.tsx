import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getCurrentUserName from '../../../utils/getCurrentUser';
import iosLocalHost from '../../../utils/testingConsts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import order from '../home/order';
import { useFocusEffect } from 'expo-router';
import { isEqual } from 'lodash';



  const Notifications = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [username, setUserName] = useState('');
  
    useFocusEffect(
      React.useCallback(() => {
        console.log('NOTIFICATIONS SCREEN USE EFFECT CALLED')
        fetchData();
      }, [])
    )

    const fetchData = async () => {
      // Fetch orders associated with the username
      //const username = await getCurrentUserName();
      const username = await AsyncStorage.getItem('username');
      setUserName(username);
      const token = await AsyncStorage.getItem('token');
      if (username && username !== 'Not Logged In' && username !== 'Error Retrieving Token') {
        try {
          const response = await fetch(`${iosLocalHost}:8080/api/orders/${username}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const orderData = await response.json();
          if(!isEqual(orderData, orders)){
            setOrders(orderData);
          }
          
        } catch (error) {
          console.error('Error fetching orders:', error);
        }

      } else{
        setOrders([])
      }
    };
  
    const navigateToOrderStatus = (order) => {
      // Pass the order details to the next screen
      navigation.navigate('notificationsOrderStatus', { order });
    };
  
    // Reverse the orders array
    const reversedOrders = [...orders].reverse();
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {reversedOrders.map((order) => (
          <TouchableOpacity key={order._id} onPress={() => navigateToOrderStatus(order)}>
            <View style={[styles.subTab]}>
              <Text>Order Status</Text>
              <Text>Your order was {order.status}.</Text>
              <Text>Order# {order._id}</Text>
              <Text>Placed on: {order.createdAt}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {!username || username === 'Not Logged In' || username === 'Error Retrieving Token' ? (
        <Text style={styles.signedOutText}>Sign in to view notifications.</Text>
      ) : null}
      </ScrollView>
    );
  };
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    backgroundColor: '#F8E435',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subTab: {
    backgroundColor: '#FFFCE5',
    padding: 30,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  subTabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  signedOutText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 300,
  },
});


export default Notifications;
