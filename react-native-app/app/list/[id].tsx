import React, { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useNavigation,  Stack, useLocalSearchParams} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storeMenuData from '../../utils/storage';
import { Menu, MenuItem, OrderItem } from '../../utils/storage';
import { parse } from 'path';
import iosLocalHost from '../../utils/testingConsts';


function convertToNumber(input: string | string[]): number | null {
    if (typeof input === 'string'){
        const parsedNumber = parseInt(input);
        if (isNaN(parsedNumber)){
            return null;
        }

        return parsedNumber
    } else if (Array.isArray(input)){
        const joinedString = input.join('');
        const parsedNumber = parseInt(joinedString);
        if (isNaN(parsedNumber)){
            return null;
        }
        return parsedNumber;
    }
}

function findMenuItemById (itemId: number, menu: Menu): MenuItem | undefined {
    let menuItem = menu.burritos.find(item => item.id === itemId);
    if (!menuItem){
        menuItem = menu.sides.find(item => item.id === itemId)
    }
    if (!menuItem){
        menuItem = menu.drinks.find(item => item.id === itemId)
    }

    return menuItem;
}

const DetailsPage = () => {

    const [menuData, setMenuData] = useState<MenuItem | null>(null);
    //const { id } = useLocalSearchParams();
    const {collection, id } = useLocalSearchParams();
    const idString = id;
    const isCollection = collection;
    const collections = ['burritos', 'sides', 'drinks'];
    console.log(collection)
    console.log(idString)

    useEffect(() => {
      const fetchMenuData = async () => {
        try {
          for (const collectionItemItem of collections) {
            const response = await fetch(`${iosLocalHost}:8080/api/getOne/${collectionItemItem}/${id}`);
            if (response.ok) {
              const data = await response.json();
              console.log("+++++++++++++++++++++++++++++" + JSON.stringify(data))
              setMenuData(data);
              return; // Exit the loop if a valid response is found
            }
          }
          // Handle the case when no valid response is found for any collection
          console.error('Menu item not found for ID:', id);
        } catch (error) {
          console.error('Error fetching menu item details:', error);
        }
      };
  
      fetchMenuData();
    }, [id, collection]);

    const [itemQuantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (itemQuantity > 1) {
            setQuantity(itemQuantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(itemQuantity + 1);
    };

    const navigation = useNavigation();

    // const addToOrder = () => {
    //     navigation.navigate('shoppingCart');
    // };

    const addToOrder = async () => {
      try {
        // get order array, any other orders should appear here.
        const existingOrder = await AsyncStorage.getItem('order');
        let order: OrderItem[] = [];
        if (existingOrder) {
          order = JSON.parse(existingOrder);
        }
        if (menuData) {
          const itemToAdd: OrderItem = {
            id: menuData.id,
            name: menuData.name,
            price: menuData.price,
            quantity: itemQuantity
          };
          order.push(itemToAdd);
          await AsyncStorage.setItem('order', JSON.stringify(order));
          navigation.navigate('shoppingCart');
          console.log("====================================================" + order)
          console.log(existingOrder)
        }
      } catch (error) {
        console.error('Error adding item to order:', error);
      }
    };
    
 

    console.log(menuData)

    return (
        
        <View>
            <Stack.Screen options={{headerTitle: `Details #${id}`, headerStyle: {     backgroundColor: '#F8E435'}}}/>
            <Image
                source={require('../../assets/breakfastBurrito.jpeg')}
                style={styles.image}
            />
            <View style={styles.tab}>
                <Text style={styles.tabText}>{menuData ? menuData.name : 'Loading...'}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Calories: {menuData ? menuData.calories : 'Loading...'}</Text>
                <Text style={styles.infoText}>{menuData ? menuData.description:'Loading...'}</Text>
                <Text style={styles.infoText}>${menuData ? menuData.price : 'Loading...'}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity}>
                    <Text style={styles.actionButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{itemQuantity}</Text>
                <TouchableOpacity onPress={increaseQuantity}>
                    <Text style={styles.actionButton}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addToOrder}>
                    <View style={styles.addToOrderButton}>
                        <Text style={styles.addToOrderButtonText}>Add to Order</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth * 1.0;

const imageHeight = imageWidth / 1;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 0,
      backgroundColor: '#FFFCE5',
    },
    tab: {
      backgroundColor: '#F8E435',
      padding: 10,
      width: '100%',
      alignItems: 'center',
    },
    tabText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      resizeMode: 'contain',
    },
    infoContainer: {
      padding: 10,
    },
    infoText: {
      fontSize: 16,
      marginBottom: 8,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: 10,
      backgroundColor: '#F8E435',
    },
    actionButton: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    quantity: {
      fontSize: 18,
    },
    addToOrderButton: {
      backgroundColor: '#515D52',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addToOrderButtonText: {
      color: '#ffffff',
      fontSize: 16,
    },
  });

export default DetailsPage;

