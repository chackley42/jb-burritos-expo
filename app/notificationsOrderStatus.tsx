import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useNavigation  } from 'expo-router';

const notificationsOrderStatus = () => {
  const navigation = useNavigation();

  const navigateToFoodTruck = () => {
    navigation.navigate('navigate');
  };

  // navigation.setOptions({
  //   title: 'Order Status',
  //   headerStyle: {
  //     backgroundColor: '#F8E435',
  //   },
  // });
  return (
    <ScrollView>
        
      <View style={[styles.container2]}>
        <Text>Order# 34253</Text>
        <Text>Placed on 09/13/23 at 3:52pm.</Text>
        <Text>Estimated to be ready at 4:00pm.</Text>
        <Text></Text>
        <Text>You received rewards points on this order!</Text>
        <Text></Text>
      </View>
      <View style={[styles.container3]}>
        <Text>Food Truck's Current Location</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity onPress={navigateToFoodTruck}>
          <View style={styles.navigateButton}>
            <Text style={styles.navigateButtonText}>Navigate to Food Truck</Text>
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
});
export default notificationsOrderStatus;