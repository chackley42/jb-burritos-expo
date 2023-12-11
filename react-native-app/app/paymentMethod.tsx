import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useNavigation, Stack  } from 'expo-router';
import PaymentForm from '../components/PaymentForm'

const paymentMethod = () => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{title: 'Payment Method', headerStyle: {     backgroundColor: '#F5A800'}}}/>
      <View style={[styles.container2]}>
        <PaymentForm></PaymentForm>
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
    backgroundColor: '#F5A800',
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
});
export default paymentMethod;