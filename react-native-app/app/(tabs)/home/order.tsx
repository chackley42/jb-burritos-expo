import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useNavigation, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storeMenuData from '../../../utils/storage';
import iosLocalHost from '../../../utils/testingConsts';

//storeMenuData()

const order = () => {
  // const navigation = useNavigation();
  // navigation.setOptions({
  //   title: 'Order',
  //   headerStyle: {
  //     backgroundColor: '#F8E435',
  //   },
  // });
  const [isBurritosOpen, setBurritosOpen] = useState(true);
  const [isSidesOpen, setSidesOpen] = useState(true);
  const [isBeveragesOpen, setBeveragesOpen] = useState(true);
  const [menuData, setMenuData] = useState({ burritos: [], sides: [], drinks: [] });
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch menu data from AsyncStorage
    const fetchMenuData = async () => {
      // try {
      //   const menuDataJSON = await AsyncStorage.getItem('menuData');
      //   if (menuDataJSON) {
      //     const parsedMenuData = JSON.parse(menuDataJSON);
      //     setMenuData(parsedMenuData);
      //   }
      // } catch (error) {
      //   console.error('Error fetching menu data from AsyncStorage:', error);
      // }
      try {
        // // Fetch burritos data from the API
        // const burritosResponse = await fetch(`${iosLocalHost}:8080/api/burritos`);
        // const burritosData = await burritosResponse.json();
        
        // // Fetch sides data from the API
        // const sidesResponse = await fetch(`${iosLocalHost}:8080/api/sides`);
        // const sidesData = await sidesResponse.json();

        // // Fetch beverages data from the API
        // const beveragesResponse = await fetch(`${iosLocalHost}:8080/api/drinks`);
        // const beveragesData = await beveragesResponse.json();

        // console.log('API FETCHED DATA OLD: ' + JSON.stringify(burritosData))

        const burritosData = await AsyncStorage.getItem('burritos');
        const sidesData = await AsyncStorage.getItem('sides');
        const beveragesData = await AsyncStorage.getItem('drinks');

        const parsedBurritos = burritosData ? JSON.parse(burritosData) : [];
        const parsedSides = sidesData ? JSON.parse(sidesData) : [];
        const parsedBeverages = beveragesData ? JSON.parse(beveragesData) : [];

        setMenuData({ burritos: parsedBurritos, sides: parsedSides, drinks: parsedBeverages });

        // OLD WAY
        //setMenuData({ burritos: burritosData, sides: sidesData, drinks: beveragesData});
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
    navigation.navigate('shoppingCart'); // Navigate back to the menu or any other appropriate route
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{title: 'Menu', headerStyle: {     backgroundColor: '#F8E435'}}}/>
      <TouchableOpacity style={styles.tab} onPress={toggleBurritos}>
        <Text style={styles.tabText}>Burritos</Text>
      </TouchableOpacity>
      {isBurritosOpen && menuData && menuData.burritos.map((item) => (
        <View key={item.id} style={[styles.subTab]}>
          <Link style={[styles.link]} href={`home/list/${item.id}`}>
            <Text>{item.name}</Text>
          </Link>
        </View>
      ))}
      <TouchableOpacity style={styles.tab} onPress={toggleSides}>
        <Text style={styles.tabText}>Sides</Text>
      </TouchableOpacity>
      {isSidesOpen && menuData && menuData.sides.map((item) => (
        <View key={item.id} style={[styles.subTab]}>
          <Link style={[styles.link]} href={`home/list/${item.id}`}>
            <Text>{item.name}</Text>
          </Link>
        </View>
      ))}
      <TouchableOpacity style={[styles.tab]} onPress={toggleBeverages}>
        <Text style={styles.tabText}>Beverages</Text>
      </TouchableOpacity>
      {isBeveragesOpen && menuData && menuData.drinks.map((item) => (
        <View key={item.id} style={[styles.subTab]}>
          <Link style={[styles.link]} href={`home/list/${item.id}`}>
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
  bottomTab: {
    backgroundColor: '#F8E435',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  subTab: {
    backgroundColor: '#FFFCE5',
    padding: 10,
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