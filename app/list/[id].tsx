import React, { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useNavigation,  Stack, useLocalSearchParams} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storeMenuData from '../../utils/storage';


const getObjectById = async (id) => {
    try {
      const menuDataJSON = await AsyncStorage.getItem('menuData');
      if (menuDataJSON) {
        const parsedMenuData = JSON.parse(menuDataJSON);
        const menuItem = parsedMenuData.logs.find(item => item.id === id);
        if (menuItem) {
          console.log('Object found:', menuItem);
          return menuItem;
        } else {
          console.log('Object not found.');
          return null;
        }
      }
    } catch (error) {
      console.error('Error fetching menu data from AsyncStorage:', error);
      return null;
    }
  };


const DetailsPage = () => {

    const [menuData, setMenuData] = useState(null);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchCurrentMenuItemData = async () => {
            try {
                const menuItem = await getObjectById(id);
                if (menuItem) {
                    setMenuData([menuItem]); // Wrap the menu item in an array to handle single item rendering
                }
            } catch (error) {
                console.error('Error fetching menu data from AsyncStorage:', error);
            }
        };
        fetchCurrentMenuItemData();
    }, [id]);
   

    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const navigation = useNavigation();

    const addToOrder = () => {
        navigation.navigate('shoppingCart');
    };


    return (
        <View>
            <Stack.Screen options={{ headerTitle: `Details #${id}` }} />
            <Image
                source={require('../../assets/breakfastBurrito.jpeg')}
                style={styles.image}
            />
            <View style={styles.tab}>
                <Text style={styles.tabText}>{menuData}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>390 Calories</Text>
                <Text style={styles.infoText}>The burrito that started it all. Made with fresh tortilla, eggs, beef and cheese.</Text>
                <Text style={styles.infoText}>$3.50</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity}>
                    <Text style={styles.actionButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity}>
                    <Text style={styles.actionButton}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addToOrder}>
                    <View style={styles.addToOrderButton}>
                        <Text style={styles.addToOrderButtonText}>Add to Order</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text>My Details for: {id}</Text>
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

