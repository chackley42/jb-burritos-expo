import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button, Alert} from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MenuItem, getMenuData, createMenuItem, OrderItem, Order } from '../../../utils/storage';
import getCurrentUserName from '../../../utils/getCurrentUser';
import isEqual from 'lodash/isEqual';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import order from '../home/order';
import PaymentModal from '../../../components/PaymentModal';
import iosLocalHost from '../../../utils/testingConsts';
import OrderSuccessModal from '../../../components/OrderSuccessModal';
import { router } from 'expo-router';



const getOrderData = async (): Promise<OrderItem[]> => {
  try {
    const orderData = await AsyncStorage.getItem('order');
    if (orderData) {
      const parsedOrderData: OrderItem[] = JSON.parse(orderData);
      
      console.log('------------------------------' + orderData)
      // console.log('++++++++++++++++++++++++++++++++' + parsedOrderData)
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
  const [isOrderSuccessModalVisible, setIsOrderSuccessModalVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchOrderData = async () => {
        try {
          const data = await getOrderData();
          
          // Check if the new data is different from the current state
          if (!isEqual(data, orderItems)) {
            setOrderItems(data);
          }
        } catch (error) {
          console.error('Error fetching order data:', error);
        }
      };

      const fetchUserData = async () => {
        try {
          //const username = await getCurrentUserName();
          const username = await AsyncStorage.getItem('username');
          if (username && username !== 'Not Logged In') {
            setLoggedInUser(username);
            setIsUserAuthenticated(true);
          } else {
            setIsUserAuthenticated(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
  
      fetchOrderData();
      console.log('SHOPPING CART USE EFFECT CALLED')
    }, []) // Add orderItems as a dependency
  );
  
  const handleCloseSuccessModal = () => {
    setIsOrderSuccessModalVisible(false);
  }
  const goToNotifications = () => {
    setIsOrderSuccessModalVisible(false); // Close the modal
  };

  const calculateSubtotal = (): number => {
    try {
      return orderItems.reduce((total, item) => {
        // Ensure item has a valid price before adding to the total
        if (item && item.price) {
          total += item.price * (item.quantity || 1);
        }
        return total;
      }, 0);

    } catch {
      return 0
    }
    
  };

  const getSubmittedData = async (): Promise<Order> => {
    try {
      const orderData = await AsyncStorage.getItem('order');
      if (orderData) {
        
        const parsedOrderData: OrderItem[] = JSON.parse(orderData);
        const username: string = await getCurrentUserName()
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" +username)
        const newOrder: Order = {
          orderID: '12345',
          phoneNumber: '000-000-0000',
          subtotal: calculateSubtotal().toFixed(2).toString(), // Note: Assuming subtotal, tax, and total are represented as strings
          tax: (calculateSubtotal() * 0.0725).toFixed(2).toString(),
          total: (calculateSubtotal() + calculateSubtotal() * 0.0725).toFixed(2).toString(),
          items: parsedOrderData,
          username: username
        };
        console.log('New Order:', newOrder);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$' + JSON.stringify(newOrder))
        // console.log('++++++++++++++++++++++++++++++++' + parsedOrderData)
        return newOrder;
      } else {
        return ;
      }
    } catch (error) {
      console.error(`Error retrieving Order data from AsyncStorage:`, error);
      throw error;
    }
  };

  const placeOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const orderData = await getSubmittedData();
      console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO' + orderData)
  
      const response = await fetch(`${iosLocalHost}:8080/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          username: `username ${username}`
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        // Order placed successfully, handle the response if needed
        setOrderItems([])
        console.log('Order placed successfully!');
        setIsOrderSuccessModalVisible(true); // Show the success modal
  
        // Clear the order data from AsyncStorage
        await AsyncStorage.setItem('order', '');
      } else {
        // Handle error response from the server
        console.error('Failed to place order:', response.status, response.statusText);
        Alert.alert('Error', 'Failed to place order. Please try again later.');
      }
    } catch (error) {
      // Handle other errors like network issues, etc.
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order. Please check your internet connection and try again.');
    }
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
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecrement(item.id)}>
          <Text style={styles.actionButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrement(item.id)}>
          <Text style={styles.actionButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
           <Icon name="trash" size={24} />
         </TouchableOpacity>
         <View style={styles.priceContainer}>
           <Text style={styles.priceText}> {item.price !== undefined ? `$${(item.price * item.quantity).toFixed(2)}` : 'Price not available'}</Text>
           </View>
        </View>
      </View>
      </ScrollView>
    );
  };
  const goToMenu = () => {
    navigation.navigate('order'); // Navigate back to the menu or any other appropriate route
  };
  const navigateToSignIn = () => {
    navigation.navigate('profile'); // Replace 'SignIn' with the actual name of your sign-in page
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tab}>
        <TouchableOpacity onPress={goToMenu}>
          <View style={styles.addToOrderButton}>
            <Text style={styles.addToOrderButtonText}>View Menu</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString() || null}
      />
      <View style={styles.totalTabContainer}>
        <View style={styles.rowContainer}>
        {/* Conditionally render based on logged-in user */}
      {isUserAuthenticated ? (
        <Text style={styles.totalText}>{`Logged in as: ${loggedInUser}`}</Text>
      ) : (
        <TouchableOpacity onPress={navigateToSignIn}>
          <View style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </View>
        </TouchableOpacity>
      )}
          <View style={styles.totalInfoContainer}>
          <Text style={styles.totalText}>Subtotal: ${calculateSubtotal().toFixed(2)}</Text>
            {/* Include tax calculation logic here if needed */}
            <Text style={styles.totalText}>Taxes: ${(calculateSubtotal() * 0.0725).toFixed(2)}</Text>
            <Text style={styles.totalText}>Total: ${(calculateSubtotal() + calculateSubtotal() * 0.0725).toFixed(2)}</Text>
          </View>
          
        </View>
        {/* <View style={styles.addToOrderButton}>
          <Text style={styles.addToOrderButtonText}>Payment Details</Text>
        </View> */}
        <View style={styles.tab}>
          {/* <TouchableOpacity>
            <View style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </View>
          </TouchableOpacity> */}
          <View style={styles.paymentModalButton}>
            <Text style={styles.addToOrderButtonText}><PaymentModal></PaymentModal></Text>
          </View>
        </View>
      </View>

      <View style={styles.tab}>
        <TouchableOpacity onPress={placeOrder}>
          <View style={styles.addToOrderButton}>
            <Text style={styles.addToOrderButtonText}>Place Order</Text>
          </View>
        </TouchableOpacity>
      </View>
      <OrderSuccessModal
        visible={isOrderSuccessModalVisible}
        onClose={handleCloseSuccessModal}
        onGoToNotifications={notifications} // Pass the function to navigate to notifications
      />
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
  signInButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft: 10,
    marginHorizontal: 20,
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  totalTabContainer: {
    backgroundColor: '#F8E435',
    padding: 20,
    width: '100%',
    alignItems: 'flex-end',
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
  itemName: {
    fontSize: 20,
  },
  actionButton: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 20,
  },
  priceContainer: {
    backgroundColor: '#FFFCE5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  priceText: {
    color: '#000000',
    fontSize: 20,
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
    paddingVertical: 0,
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 0,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#515D52'
  },
  totalInfoContainer: {
    marginRight: 35, 
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    textAlign: 'right',
    marginLeft: 50,
    fontSize: 18,
  },
});

export default OrderComponent;