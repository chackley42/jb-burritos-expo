import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button} from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MenuItem, getMenuData, createMenuItem, OrderItem } from '../../../utils/storage';

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import order from '../home/order';
import PaymentModal from '../../../components/PaymentModal';



const getOrderData = async (): Promise<OrderItem[]> => {
  try {
    const orderData = await AsyncStorage.getItem('order');
    if (orderData) {
      const parsedOrderData: OrderItem[] = JSON.parse(orderData);
      console.log(parsedOrderData)
      return parsedOrderData;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error retrieving Order data from AsyncStorage:`, error);
    throw error;
  }
};

const OrderComponent = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchOrderData = async () => {
        try {
          const data = await getOrderData();
          setOrderItems(data);
        } catch (error) {
          console.error('Error fetching order data:', error);
        }
      };

      fetchOrderData();
    }, [])
  );

  const calculateSubtotal = (): number => {
    return orderItems.reduce((total, item) => {
      // Ensure item has a valid price before adding to the total
      if (item && item.price) {
        total += item.price * (item.quantity || 1);
      }
      return total;
    }, 0);
  };
  
  const handleDelete = async (itemId: number) => {
    try {
      //get current order data
      const orderData = await AsyncStorage.getItem('order');
      if (orderData){
        // parse to arr of OrderItem instances
        const orderItems: OrderItem[] = JSON.parse(orderData);
        //find index of item to be deleted, then delete
        const itemIndex = orderItems.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1){
          orderItems.splice(itemIndex, 1);

          // Update order data
          await AsyncStorage.setItem('order', JSON.stringify(orderItems));

          //Re-update UseState, to re-render the page.
          setOrderItems(orderItems)
        }
      }
    } catch (error) {
      console.log('Error deleting item from order:', error)
    }
  };

  const handleIncrement = async (itemId: number) => {
    try {
      // Get the current order data from AsyncStorage
      const orderData = await AsyncStorage.getItem('order');
      if (orderData) {
        // Parse the order data into an array of OrderItems
        const orderItems: OrderItem[] = JSON.parse(orderData);
  
        // Find the index of the item to be incremented
        const itemIndex = orderItems.findIndex((item) => item.id === itemId);
  
        if (itemIndex !== -1) {
          // Create a new OrderItem instance based on the found item
          const updatedOrderItems: OrderItem[] = [...orderItems];
          // Increment the quantity property of the item
          updatedOrderItems[itemIndex] = {
            ...updatedOrderItems[itemIndex], // Copy existing properties
            quantity: (updatedOrderItems[itemIndex].quantity || 1) + 1, // Increment the quantity
          };
  
          // Update the order data in AsyncStorage
          await AsyncStorage.setItem('order', JSON.stringify(updatedOrderItems));
  
          // Update the state to trigger a re-render and reflect the changes
          setOrderItems(updatedOrderItems);
        }
      }
    } catch (error) {
      console.error('Error incrementing item quantity:', error);
    }
  };
  
  
  

  const handleDecrement = async (itemId: number) => {
    try {
      // Get the current order data from AsyncStorage
      const orderData = await AsyncStorage.getItem('order');
      if (orderData) {
        // Parse the order data into an array of OrderItems
        const orderItems: OrderItem[] = JSON.parse(orderData);
  
        // Find the index of the item to be incremented
        const itemIndex = orderItems.findIndex((item) => item.id === itemId);
  
        if (itemIndex !== -1) {
          // Create a new OrderItem instance based on the found item
          const updatedOrderItems: OrderItem[] = [...orderItems];
          // Decrement the quantity property of the item
          if (updatedOrderItems[itemIndex].quantity > 1)
          updatedOrderItems[itemIndex] = {
            ...updatedOrderItems[itemIndex], // Copy existing properties
            quantity: (updatedOrderItems[itemIndex].quantity || 1) - 1, // Decrement the quantity
          };
  
          // Update the order data in AsyncStorage
          await AsyncStorage.setItem('order', JSON.stringify(updatedOrderItems));
  
          // Update the state to trigger a re-render and reflect the changes
          setOrderItems(updatedOrderItems);
        }
      }
    } catch (error) {
      console.error('Error incrementing item quantity:', error);
    }
  };
  const navigation = useNavigation();
 
  const notifications = () => {
    navigation.navigate('notifications');
  };

  const renderItem = ({ item }: { item: OrderItem }) => {

    if (!item) {
      return (
        <View style={styles.noItemsContainer}>
          <Text>No items</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subTab}>
        <Text>{item.name}</Text>
        <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecrement(item.id)}>
          <Text style={styles.actionButton}>-</Text>
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrement(item.id)}>
          <Text style={styles.actionButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
           <Icon name="trash" size={24} />
         </TouchableOpacity>
         <View style={styles.priceContainer}>
           <Text style={styles.priceText}> {item.price !== undefined ? `$${item.price * item.quantity}` : 'Price not available'}</Text>
           </View>
        </View>
      </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString() || null}
      />
      <View style={styles.totalTabContainer}>
        <Text>Subtotal: ${calculateSubtotal().toFixed(2)}</Text>
        {/* Include tax calculation logic here if needed */}
        <Text>Taxes: ${(calculateSubtotal() * 0.0725).toFixed(2)}</Text>
        <Text>Total: ${(calculateSubtotal() + calculateSubtotal() * 0.0725).toFixed(2)}</Text>
        {/* <View style={styles.addToOrderButton}>
             <Text style={styles.addToOrderButtonText}>Payment Details</Text>
           </View> */}
           <View style={styles.paymentModalButton}>
           <Text style={styles.addToOrderButtonText}><PaymentModal></PaymentModal></Text>
           </View>
      </View>

       <View style={styles.tab}>
         <TouchableOpacity onPress={notifications}>
           <View style={styles.addToOrderButton}>
             <Text style={styles.addToOrderButtonText}>Place Order</Text>
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
  totalTabContainer: {
    backgroundColor: '#F8E435',
    padding: 30,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#FFFCE5',
  },
  actionButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
  },
  priceContainer: {
    backgroundColor: '#FFFCE5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  priceText: {
    color: '#000000',
    fontSize: 18,
  },
  addToOrderButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addToOrderButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  paymentModalButton:{
    //backgroundColor: '#515D52',
    // borderRadius: 10,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    height: 40,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // You can set the background color here
  },
});

export default OrderComponent;