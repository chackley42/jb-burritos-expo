import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useNavigation  } from 'expo-router';


const payment = () => {
const navigation = useNavigation();

  const navigateToPaymentMethod = () => {
    navigation.navigate('paymentMethod');
  };

  const placeOrder = () => {
      navigation.navigate('notifications');
    };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>Payment Details</Text>
      </View>
        
      <TouchableOpacity onPress={navigateToPaymentMethod}>
        <View style={[styles.subTab]}>
          <Text>Payment Method</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={[styles.subTab]}>
          <Text>Sign In for Rewards</Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.totalTabContainer]}>
          <Text>Subtotal: $7.50</Text>
          <Text>Rewards Discount: -$1.00</Text>
          <Text>Taxes: $0.47</Text>
          <Text>Total: $7.97</Text>
        </View>
      <View style={styles.tab}>
        <TouchableOpacity onPress={placeOrder}>
          <View style={styles.placeOrderButton}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
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
    alignItems: 'left',
  },
  container3: {
    flexGrow: 1,
    fontSize: 18,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 30,
    width: '100%',
    alignItems: 'left',
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
    padding: 10,
    width: '100%',
    alignItems: 'left',
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
    alignItems: 'leftt',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  placeOrderButton: {
    backgroundColor: '#515D52',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  placeOrderButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
export default payment;