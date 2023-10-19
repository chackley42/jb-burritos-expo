import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button} from 'react-native';
import { Link, useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MenuItem, getMenuData, createMenuItem, OrderItem } from '../../../utils/storage';

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import order from '../home/order';



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

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await getOrderData();
        setOrderItems(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

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
  const payment = () => {
    navigation.navigate('payment');
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
           <Text style={styles.priceText}> {item.price !== undefined ? `$${item.price}` : 'Price not available'}</Text>
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
      <View style={[styles.totalTabContainer]}>
           <Text>Subtotal: $10.50</Text>
           <Text>Taxes: $0.76</Text>
           <Text>Total: $11.26</Text>
         </View>

       <View style={styles.tab}>
         <TouchableOpacity onPress={payment}>
           <View style={styles.addToOrderButton}>
             <Text style={styles.addToOrderButtonText}>Proceed To Payment</Text>
           </View>
         </TouchableOpacity>
         </View>
    </View>
  );
};

// const shoppingCart = () => {
  // const navigation = useNavigation();
  // const [quantity, setQuantity] = useState(1);
  // const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  // const [order, setOrder] = useState<MenuItem[]>([]);

  // useEffect(() => {
  //   //Get Order data
  //   const orderList = getOrderData();
  //   setOrder(orderList)
    
  // }, []); // empty array esnures it runs once after render

  // useEffect(() => {
  //   const menuData = getMenuData();
  //   const orderData =  getOrderData()
  //   // order array here
  //   const selectedMenuItemIds = [1, 2, 3];
   

  //   const selectedItems = selectedMenuItemIds.map((itemId) =>
  //     menuData.burritos.find((item) => item.id === itemId)
  //   );

  //   setSelectedMenuItems(selectedItems);
  // }, []);

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const addToOrder = () => {
    
  // };

  // const payment = () => {
  //   navigation.navigate('payment');
  // };

  // return (

  // )
  
  
  
  // (
//     <ScrollView contentContainerStyle={styles.container}>
//       {selectedMenuItems[0] && (
//         <View key={selectedMenuItems[0].id} style={[styles.subTab]}>
//           <Text>{selectedMenuItems[0].name}</Text>
//           <View style={styles.quantityContainer}>
//           <View style={styles.quantityContainer}>
//         <TouchableOpacity onPress={decreaseQuantity}>
//           <Text style={styles.actionButton}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.quantity}>{quantity}</Text>
//         <TouchableOpacity onPress={increaseQuantity}>
//           <Text style={styles.actionButton}>+</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="trash" size={24} />
//         </TouchableOpacity>

        
//           <View style={styles.priceContainer}>
//           <Text style={styles.priceText}>${selectedMenuItems[2].price.toFixed(2)}</Text>
//           </View>
//       </View>
//           </View>
//         </View>
//       )}

//       {selectedMenuItems[1] && (
//         <View key={selectedMenuItems[1].id} style={[styles.subTab]}>
//           <Text>{selectedMenuItems[1].name}</Text>
//           <View style={styles.quantityContainer}>
//           <View style={styles.quantityContainer}>
//         <TouchableOpacity onPress={decreaseQuantity}>
//           <Text style={styles.actionButton}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.quantity}>{quantity}</Text>
//         <TouchableOpacity onPress={increaseQuantity}>
//           <Text style={styles.actionButton}>+</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="trash" size={24} />
//         </TouchableOpacity>

        
//           <View style={styles.priceContainer}>
//           <Text style={styles.priceText}>${selectedMenuItems[2].price.toFixed(2)}</Text>
//           </View>
//       </View>
//           </View>
//         </View>
//       )}

//       {selectedMenuItems[2] && (
//         <View key={selectedMenuItems[2].id} style={[styles.subTab]}>
//           <Text>{selectedMenuItems[2].name}</Text>
//           <View style={styles.quantityContainer}>
//           <View style={styles.quantityContainer}>
//         <TouchableOpacity onPress={decreaseQuantity}>
//           <Text style={styles.actionButton}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.quantity}>{quantity}</Text>
//         <TouchableOpacity onPress={increaseQuantity}>
//           <Text style={styles.actionButton}>+</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="trash" size={24} />
//         </TouchableOpacity>

        
//           <View style={styles.priceContainer}>
//           <Text style={styles.priceText}>${selectedMenuItems[2].price.toFixed(2)}</Text>
//           </View>
//       </View>
//           </View>
//         </View>
//       )}
//       <View style={[styles.totalTabContainer]}>
//           <Text>Subtotal: $10.50</Text>
//           <Text>Taxes: $0.76</Text>
//           <Text>Total: $11.26</Text>
//         </View>

//       <View style={styles.tab}>
//         <TouchableOpacity onPress={payment}>
//           <View style={styles.addToOrderButton}>
//             <Text style={styles.addToOrderButtonText}>Proceed To Payment</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
 //};

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
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // You can set the background color here
  },
});

export default OrderComponent;