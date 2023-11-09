import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link, Stack } from 'expo-router';

const NotificationsOrderStatus = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get the selected order from route.params
  const { order } = route.params;

  const navigateToFoodTruck = () => {
    navigation.navigate('navigate');
  };
  const goToNavigate = () => {
    navigation.navigate('navigate'); // Navigate back to the menu or any other appropriate route
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView>
      <Stack.Screen options={{title: 'Order Status and Details', headerStyle: {     backgroundColor: '#F8E435'}}}/>
      <View style={[styles.subTab]}>
        <Text>Order# {order.orderID}</Text>
        <Text>Placed on {order.date}</Text>
        {/* Display other order details as needed */}
        {order.items.map((item, index) => (
          <View key={index}>
            <Text>Item: {item.name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        ))} 
        </View>
      {}
    </ScrollView>
    <View style={styles.bottomTab}>
    <TouchableOpacity onPress={goToNavigate}>
      <View style={styles.shoppingCartButton}>
        <Text style={styles.shoppingCartButtonText}>Navigate to Food Truck</Text>
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
  },
  subTabText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  shoppingCartButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  shoppingCartButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default NotificationsOrderStatus;