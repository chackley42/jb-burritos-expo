import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useNavigation, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storeMenuData from '../../../utils/storage';
import iosLocalHost from '../../../utils/testingConsts';
import { fetchMenuDataAndStore } from '../../../utils/apiCalls';

const order = () => {
  const [isBurritosOpen, setBurritosOpen] = useState(true);
  const [isSidesOpen, setSidesOpen] = useState(true);
  const [isBeveragesOpen, setBeveragesOpen] = useState(true);
  const [menuData, setMenuData] = useState({ burritos: [], sides: [], drinks: [] });
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch menu data from AsyncStorage
    const fetchMenuData = async () => {
      try {      
        const burritosData = await AsyncStorage.getItem('burritos');
        const sidesData = await AsyncStorage.getItem('sides');
        const beveragesData = await AsyncStorage.getItem('drinks');

        if (burritosData && sidesData && beveragesData){
          const parsedBurritos = burritosData ? JSON.parse(burritosData) : [];
          const parsedSides = sidesData ? JSON.parse(sidesData) : [];
          const parsedBeverages = beveragesData ? JSON.parse(beveragesData) : [];
          setMenuData({ burritos: parsedBurritos, sides: parsedSides, drinks: parsedBeverages });
        }
        else {
          fetchMenuDataAndStore()
          const burritosData = await AsyncStorage.getItem('burritos');
          const sidesData = await AsyncStorage.getItem('sides');
          const beveragesData = await AsyncStorage.getItem('drinks');
          const parsedBurritos = burritosData ? JSON.parse(burritosData) : [];
          const parsedSides = sidesData ? JSON.parse(sidesData) : [];
          const parsedBeverages = beveragesData ? JSON.parse(beveragesData) : [];
          setMenuData({ burritos: parsedBurritos, sides: parsedSides, drinks: parsedBeverages });
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
    fetchMenuData();
  }, [isBurritosOpen, isSidesOpen, isBeveragesOpen]);

  const toggleBurritos = () => {
    setBurritosOpen(!isBurritosOpen);
  };

  const toggleSides = () => {
    setSidesOpen(!isSidesOpen);
  };

  const toggleBeverages = () => {
    setBeveragesOpen(!isBeveragesOpen);
  };
  const goToShoppingCart = () => {
    navigation.navigate('shoppingCart');
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{title: 'Menu', headerStyle: {backgroundColor: '#F5A800'}}}/>
      <TouchableOpacity style={styles.tab} onPress={toggleBurritos}>
        <Text style={styles.tabText}>Burritos</Text>
      </TouchableOpacity>
      {isBurritosOpen && menuData && menuData.burritos.map((item) => (
        <View key={item.id} style={styles.subTab}>
          <Link  style={[styles.linkTab]} href={`home/list/${item.id}`}>
            <Text>{item.name}</Text>
          </Link>
        </View>
      ))}
      <TouchableOpacity style={styles.tab} onPress={toggleSides}>
        <Text style={styles.tabText}>Sides</Text>
      </TouchableOpacity>
      {isSidesOpen && menuData && menuData.sides.map((item) => (
        <View key={item.id} style={styles.subTab}>
        <Link style={[styles.linkTab]} href={`home/list/${item.id}`}>
          <Text>{item.name}</Text>
        </Link>
      </View>
      ))}
      <TouchableOpacity style={[styles.tab]} onPress={toggleBeverages}>
        <Text style={styles.tabText}>Beverages</Text>
      </TouchableOpacity>
      {isBeveragesOpen && menuData && menuData.drinks.map((item) => (
        <View key={item.id} style={styles.subTab}>
        <Link style={[styles.linkTab]} href={`home/list/${item.id}`}>
          <Text>{item.name}</Text>
        </Link>
      </View>
      ))}
    </ScrollView>
    <View style={styles.bottomTab}>
    <TouchableOpacity onPress={goToShoppingCart}>
      <View style={styles.shoppingCartButton}>
        <Text style={styles.shoppingCartButtonText}>View Shopping Cart</Text>
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
    backgroundColor: '#FFFCE5',
  },
  tab: {
    backgroundColor: '#F5A800',
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
  bottomTab: {
    backgroundColor: '#F5A800',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  linkTab: {
    backgroundColor: '#FFFCE5',
    padding: 10,
    width: '100%',
    marginBottom: 0,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  subTab: {
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

export default order;