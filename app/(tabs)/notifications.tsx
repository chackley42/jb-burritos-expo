import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const notifications = () => {
  const navigation = useNavigation();

  const navigateToOrderStatus = () => {
    navigation.navigate('notificationsOrderStatus');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>Notifications</Text>
      </View>
        
      <TouchableOpacity onPress={navigateToOrderStatus}>
        <View style={[styles.subTab]}>
          <Text>Order Status</Text>
          <Text>Your order was received.</Text>
          <Text>Order# 34253</Text>
          <Text>Placed on: 09/13/23</Text>
        </View>
      </TouchableOpacity>
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
});

export default notifications;