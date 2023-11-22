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
  const [isAdmin, setIsAdmin] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log('NOTIFICATIONS SCREEN USE EFFECT CALLED');
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    const isAdmin = await AsyncStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdmin);

    if (isAdmin) {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${iosLocalHost}:8080/api/orders`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const orderData = await response.json();
        if (!isEqual(orderData, orders)) {
          setOrders(orderData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    } else {
      const username = await AsyncStorage.getItem('username');
      setUserName(username);
      const token = await AsyncStorage.getItem('token');
      if (username && username !== 'Not Logged In' && username !== 'Error Retrieving Token') {
        try {
          const response = await fetch(`${iosLocalHost}:8080/api/orders/${username}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const orderData = await response.json();
          if (!isEqual(orderData, orders)) {
            setOrders(orderData);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      } else {
        setOrders([]);
      }
    }
  };

  const navigateToOrderStatus = (order) => {
    navigation.navigate('notificationsOrderStatus', { order });
  };

  const renderUserOrders = () => {
    // Render for non-admin users
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {orders.map((order) => (
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
  

  const renderAdminOrders = () => {
    const reversedAdminOrders = [...orders].reverse();
    // Render for admin users
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {reversedAdminOrders.map((order) => (
          <TouchableOpacity key={order._id} onPress={() => navigateToOrderStatus(order)}>
            <View style={[styles.adminSubTab]}>
              <Text>Admin Order Status</Text>
              <Text>Current Status: "{order.status}"".</Text>
              <Text>Order# {order._id}</Text>
              <Text>Placed on: {order.createdAt}</Text>
              <Text>Placed by username: {order.username}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {isAdmin ? renderAdminOrders() : renderUserOrders()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  adminSubTab: {
    backgroundColor: '#E5F2FF',
    padding: 30,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});


export default Notifications;
