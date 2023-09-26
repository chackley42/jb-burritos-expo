import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const order = () => {
  const [isBurritosOpen, setBurritosOpen] = useState(true);
  const [isSidesOpen, setSidesOpen] = useState(true);
  const [isBeveragesOpen, setBeveragesOpen] = useState(true);

  const toggleBurritos = () => {
    setBurritosOpen(!isBurritosOpen);
  };

  const toggleSides = () => {
    setSidesOpen(!isSidesOpen);
  };

  const toggleBeverages = () => {
    setBeveragesOpen(!isBeveragesOpen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={toggleBurritos}>
        <Text style={styles.tabText}>Burritos</Text>
      </TouchableOpacity>
      {isBurritosOpen && (
        <>
          <View style={[styles.subTab]}>
          <Link style={[styles.link]} href="/list/1">
            <Text>Breakfast Burrito - Classic</Text>
          </Link>
          </View>
          <View style={[styles.subTab]}>
          <Link style={[styles.link]} href="/list/2">
            <Text>Bean and Cheese Burrito</Text>
          </Link>
          </View>
          <View style={[styles.subTab]}>
          <Link style={[styles.link]} href="/list/3">
            <Text>Veggie Burrito</Text>
          </Link>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.tab} onPress={toggleSides}>
        <Text style={styles.tabText}>Sides</Text>
      </TouchableOpacity>
      {isSidesOpen && (
        <>
        <View style={[styles.subTab]}>
          <Link style={[styles.link]} href="/list/4">
            <Text>Fries</Text>
          </Link>
          </View>
          <View style={[styles.subTab]}>
          <Link style={[styles.link]} href="/list/5">
            <Text>Bacon</Text>
          </Link>
          </View>
        </>
      )}
      <TouchableOpacity style={[styles.tab]} onPress={toggleBeverages}>
        <Text style={styles.tabText}>Beverages</Text>
      </TouchableOpacity>
      {isBeveragesOpen && (
        <>
        <View style={[styles.subTab]}>
          <Link style={[styles.link]} href="/list/6">
            <Text>Milk</Text>
          </Link>
          </View>
          <View style={[styles.subTab]}>
          <Link style={[styles.link]} href="/list/7">
            <Text>Orange Juice</Text>
          </Link>
          </View>
        </>
        
      )}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFCE5',
  },
  tab: {
    backgroundColor: '#F8E435',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
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
  link: {
    marginVertical: 5,
  },
});

export default order;