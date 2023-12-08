import { useState, useEffect } from "react";
import {useStripe} from '@stripe/stripe-react-native';
import iosLocalHost from "../utils/testingConsts";
import { Screen } from "react-native-screens";
import { Button } from "react-native-elements";
import { Alert, TouchableOpacity, StyleSheet, Text } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OrderItem } from "../utils/storage";
import getCurrentUserInfo from "../utils/getCurrentUserInfo";
import { Order } from "../utils/storage";
import { UserData } from "../utils/getCurrentUserInfo";
import getCurrentUserName from "../utils/getCurrentUser";
const publishableKey = 'pk_test_51OJkAOLiow7igI3q9tXMLYfYrx76Mf1txAmsC0A7ECdPbUFGIA15VgWGYZ7TsI2MXp6teVQvpA6uAxRiuJpZpZHa00Q6ZTMyJV'


const getOrderData = async (): Promise<OrderItem[]> => {
    try {
      const orderData = await AsyncStorage.getItem('order');
      if (orderData) {
        const parsedOrderData: OrderItem[] = JSON.parse(orderData);   
        console.log('------------------------------' + orderData)
        return parsedOrderData;
      } else {
        return [];
      }
    } catch (error) {
      console.error(`Error retrieving Order data from AsyncStorage:`, error);
      throw error;
    }
  };

export default function CheckoutScreen({orderItems, updateOrderItems}) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${iosLocalHost}:8080/api/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey
      };
    };

    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isOrderSuccessModalVisible, setIsOrderSuccessModalVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

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
        const userInfo = await getCurrentUserInfo();
        const {username, email, isAdmin, phonenumber}: UserData = userInfo.data
        const newOrder: Order = {
          orderID: '',
          phoneNumber: phonenumber,
          subtotal: calculateSubtotal().toFixed(2).toString(),
          tax: (calculateSubtotal() * 0.0725).toFixed(2).toString(),
          total: (calculateSubtotal() + calculateSubtotal() * 0.0725).toFixed(2).toString(),
          items: parsedOrderData,
          username: username
        };
        console.log('New Order:', newOrder);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$' + JSON.stringify(newOrder))
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
          console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO' + JSON.stringify(orderData))
      
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
            //setOrderItems([])
            console.log('Order placed successfully!');
            setIsOrderSuccessModalVisible(true); // Show the success modal
      
            // Clear the order data from AsyncStorage
            await AsyncStorage.setItem('order', '');
            updateOrderItems([]);
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
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        await placeOrder();
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }
      };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
        <StripeProvider
      publishableKey="pk_test_51OJkAOLiow7igI3q9tXMLYfYrx76Mf1txAmsC0A7ECdPbUFGIA15VgWGYZ7TsI2MXp6teVQvpA6uAxRiuJpZpZHa00Q6ZTMyJV"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Screen>
        <TouchableOpacity disabled={!loading} onPress={openPaymentSheet} style={styles.checkoutButton}> 
        <Text style={styles.checkoutbtnText}>Checkout</Text>
        </TouchableOpacity>
      </Screen>
      </StripeProvider>
    );
  }

  const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  checkoutButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkoutbtnText: {
    color: 'white',
    fontSize: 16,
  },
});