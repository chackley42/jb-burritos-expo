import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getCurrentUserName from '../../../utils/getCurrentUser';
import iosLocalHost from '../../../utils/testingConsts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import order from '../home/order';
import { useFocusEffect } from 'expo-router';
import { isEqual } from 'lodash';
import { FontAwesome } from '@expo/vector-icons';

export const formatDate = (isoDateString) => {
  // Check if isoDateString is undefined or null
  if (!isoDateString) {
    console.error('Invalid isoDateString:', isoDateString);
    return null;
  }

  const cleanedDateString = isoDateString.replace(/\.\d+/, '').replace(/([+-]\d{2}):(\d{2})$/, '$1$2');

  const date = new Date(cleanedDateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', isoDateString);
    return null;
  }

  // Get the month abbreviation
  const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

  // Get the day with suffix (e.g., 1st, 2nd, 3rd, 4th)
  const dayWithSuffix = getDayWithSuffix(date.getDate());

  // Get the time in 12-hour format
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  // Formatted date string
  const formattedDate = `${monthAbbreviation} ${dayWithSuffix}, ${time}`;

  return formattedDate;
};


const getDayWithSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

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
        const response = await fetch(`${iosLocalHost}/api/orders`, {
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
          const response = await fetch(`${iosLocalHost}/api/orders/${username}`, {
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

  const toggleOrderStatus = async (orderId, currentStatus) => {
    const newStatus =
      currentStatus === 'order received and is being prepared'
        ? 'ready for pickup'
        : 'order received and is being prepared';

    // Update the order status on the server
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${iosLocalHost}/api/orders/${orderId}/status`, {
        method: 'PATCH', // Used PATCH method to update existing resources
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }), // Update the status
      });

      // Check if the request was successful
      if (response.ok) {
        // Fetch updated order data after the toggle
        fetchData();
      } else {
        console.error('Error updating order status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const archiveOrder = async (orderId, currentStatus) => {
    const newStatus =
      currentStatus === 'ready for pickup'
        ? 'complete'
        : 'ready for pickup';

    // Update the order status on the server
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${iosLocalHost}/api/orders/${orderId}/status`, {
        method: 'PATCH', // Used PATCH method to update existing resources
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }), // Update the status
      });

      // Check if the request was successful
      if (response.ok) {
        // Fetch updated order data after the toggle
        fetchData();
      } else {
        console.error('Error updating order status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const OrderItem = ({ order, onToggleStatus }) => {
    const [loading, setLoading] = useState(false);
  
    const getStatusButtonColor = () => {
      return order.status === 'ready for pickup' ? 'green' : 'orange';
    };
  
    const isArchiveDisabled = order.status === 'order received and is being prepared';
  
    const handleToggleStatus = async () => {
      setLoading(true);
      await onToggleStatus(order._id, order.status);
      setLoading(false);
    };
  
    useEffect(() => {
      setLoading(false);
    }, [order, onToggleStatus]);
  
    return (
      <TouchableOpacity onPress={() => navigateToOrderStatus(order)}>
        <View style={[styles.adminSubTab]}>
          <View style={[styles.statusTextContainer, { backgroundColor: '#E5F2FF' }]}>
            <Text style={styles.subTabText}>Order# </Text>
            <Text style={styles.subTabText}>{order._id}</Text>
          </View>
  
          <View style={[styles.statusTextContainer, { backgroundColor: '#E5F2FF' }]}>
            <Text style={styles.subTabText}>Placed on: </Text>
            <Text style={styles.subTabText}>{formatDate(order.createdAt)}</Text>
            <Text style={styles.statusText}>{order.username}</Text>
          </View>
  
          <View style={[styles.statusTextContainer, { backgroundColor: '#E5F2FF' }]}>
            <Text style={[styles.statusText]}>Status</Text>
            <Text style={[{ color: getStatusButtonColor() }]}>
              {loading ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : (
                <Text style={styles.statusText}>
                  {order.status === 'ready for pickup' ? (
                    <FontAwesome name="check-circle-o" size={40} color="green" />
                  ) : order.status === 'order received and is being prepared' ? (
                    <FontAwesome name="clock-o" size={40} color="orange" />
                  ) : (
                    order.status
                  )}
                </Text>
              )}
            </Text>
          </View>
  
          <View>
            {order.status !== 'complete' && (
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  { backgroundColor: getStatusButtonColor(), opacity: loading ? 0.5 : 1 },
                ]}
                onPress={handleToggleStatus}
                disabled={loading}
              >
                <Text style={styles.toggleButtonText}>Toggle Status</Text>
              </TouchableOpacity>
            )}
            {order.status !== 'complete' && (
              <TouchableOpacity
                style={[
                  styles.archiveButton,
                  { backgroundColor: isArchiveDisabled ? 'grey' : 'red', opacity: isArchiveDisabled ? 0.5 : 1 },
                ]}
                onPress={() => archiveOrder(order._id, order.status)}
                disabled={isArchiveDisabled}
              >
                <Text style={styles.toggleButtonText}>Archive</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const UserOrderItem = ({order}) => {

    const getStatusButtonColor = () => {
      return order.status === 'ready for pickup' ? 'green' : 'orange';
    };

    return (
    <TouchableOpacity onPress={() => navigateToOrderStatus(order)}>
        <View style={[styles.subTab]}>
        <View style={[styles.statusTextContainer]}>
            <Text style={styles.subTabText}>Order# {order._id}</Text>
          </View>
          {/* Order Status Text */}
          <View style={[styles.statusTextContainer]}>
            <Text style={[styles.statusText]}>Status</Text>
            
                <Text style={styles.statusText}>
                  {order.status === 'ready for pickup' ? (
                    <FontAwesome name="check-circle-o" size={20} color="green" />
                  ) : order.status === 'order received and is being prepared' ? (
                    <FontAwesome name="clock-o" size={20} color="orange" />
                  ) : (
                    order.status
                  )}
                </Text>
                <Text style={styles.statusText}>
                  {order.status === 'ready for pickup' ? (
                    <Text style={[styles.statusTextContainer, { color: getStatusButtonColor() }]}>Order ready</Text>
                  ) : order.status === 'order received and is being prepared' ? (
                    <Text style={[styles.statusTextContainer, { color: getStatusButtonColor() }]}>Order being prepared</Text>
                  ) : (
                    order.status
                  )}
                </Text>
          </View>
          <View style={[styles.statusTextContainer]}>
            <Text style={styles.subTabText}>Placed on: {formatDate(order.createdAt)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const [filter, setFilter] = useState('active');

  const renderAdminOrders = () => {
    const reversedOrders = [...orders].reverse();
    const activeOrders = reversedOrders.filter((order) => order.status !== 'complete');
    const completedOrders = reversedOrders.filter((order) => order.status === 'complete');
  
    const filteredOrders = filter === 'active' ? activeOrders : completedOrders;
  
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchData();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.refreshMsg}>
          <Text style={styles.clientReloadText}>
            <FontAwesome name="arrow-down" size={20} color="white" /> Pull down to refresh page{' '}
            <FontAwesome name="arrow-down" size={20} color="white" />
          </Text>
        </View>
  
        <View>
          <View style={styles.tabButtonsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, filter === 'active' && styles.activeTabButton]}
              onPress={() => setFilter('active')}
            >
              <Text style={styles.tabButtonText}>Active Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, filter === 'completed' && styles.activeTabButton]}
              onPress={() => setFilter('completed')}
            >
              <Text style={styles.tabButtonText}>Completed Orders</Text>
            </TouchableOpacity>
          </View>
  
          {filteredOrders.map((order) => (
            <OrderItem key={order._id} order={order} onToggleStatus={toggleOrderStatus} />
          ))}
        </View>
      </ScrollView>
    );
  };
  const renderUserOrders = () => {
    const reversedOrders = [...orders].reverse();
  
    // Separate completed and in-progress orders
    const completedOrders = reversedOrders.filter(order => order.status === 'complete');
    const inProgressOrders = reversedOrders.filter(order => order.status !== 'complete');
  
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchData();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.refreshMsg}>
            <Text style={styles.clientReloadText}>
              <FontAwesome name="arrow-down" size={20} color="white" /> Pull down to refresh page{' '}
              <FontAwesome name="arrow-down" size={20} color="white" />
            </Text>
          </View>
  
          <View>
            <View style={styles.tabButtonsContainer}>
              <TouchableOpacity
                style={[styles.tabButton, filter === 'active' && styles.activeTabButton]}
                onPress={() => setFilter('active')}
              >
                <Text style={styles.tabButtonText}>Active Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, filter === 'completed' && styles.activeTabButton]}
                onPress={() => setFilter('completed')}
              >
                <Text style={styles.tabButtonText}>Completed Orders</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          {/* Display Active or Completed Orders based on the filter */}
          {filter === 'active' ? (
            inProgressOrders.map((order) => <UserOrderItem key={order._id} order={order} />)
          ) : (
            completedOrders.map((order) => <UserOrderItem key={order._id} order={order} />)
          )}
          {!username || username === 'Not Logged In' || username === 'Error Retrieving Token' ? (
           <Text style={styles.signedOutText}>Sign in to view notifications.</Text>
         ) : null}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isAdmin ? renderAdminOrders() : renderUserOrders()}
    </View>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
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
  refreshMsg: {
    backgroundColor: '#59606e',
    alignItems: 'center',
  },
  subTab: {
    backgroundColor: '#FFFCE5',
    padding: 25,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subTabText: {
    fontSize: 20,
    color: 'black',
  },
  signedOutText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 300,
  },
  adminSubTab: {
    backgroundColor: '#E5F2FF',
    padding: 15,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  clientReloadBtn: {
    backgroundColor: 'black',
    alignItems: 'center',
    height: 30
  },

  clientReloadText: {
    color: 'white',
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center'
  },

  toggleButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },

  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },

  archiveButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },

  statusTextContainer: {
    padding: 5,
    width: 85,
    margin: 5,
    alignItems: 'flex-start'
  },

  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  orderDetailsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  tabButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
    backgroundColor: 'black'
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 2,
    marginBottom: 2,
  },
  activeTabButton: {
    backgroundColor: '#515D52',
  },
  tabButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Notifications;