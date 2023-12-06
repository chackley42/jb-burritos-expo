import React, { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, } from 'react-native';
import { Link, useNavigation, Stack, useLocalSearchParams} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storeMenuData from '../../../../utils/storage';
import { Menu, MenuItem, OrderItem } from '../../../../utils/storage';
import { parse } from 'path';
import iosLocalHost from '../../../../utils/testingConsts';
import AddToCartModal from '../../../../components/AddToCartModal';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    // AsyncStorage.removeItem("order")
    const [menuData, setMenuData] = useState<MenuItem | null>(null);
    const isMenuDataLoading = !menuData;
    const {collection, id } = useLocalSearchParams();
    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);
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

    const handleCloseAddToCartModal = () => {
      setIsAddToCartModalVisible(false);
    };

    const navigation = useNavigation();

    const addToOrder = async () => {
      try {
        // Get the existing order array from AsyncStorage
        const existingOrder = await AsyncStorage.getItem('order');
        let order: OrderItem[] = [];
        console.log('ADD ORDER TRY BLOCK, EXISTING ORDER VAL: ' + existingOrder)
    
        if (existingOrder) {
          order = JSON.parse(existingOrder);
    
          // Check if an item with the same name already exists in the order
          const existingItemIndex = order.findIndex(item => item.name === menuData?.name);
    
          if (existingItemIndex !== -1) {
            // If the item exists, update the quantity
            order[existingItemIndex].quantity += itemQuantity;
          } else {
            // If the item doesn't exist, add a new item to the order
            const itemToAdd: OrderItem = {
              id: menuData?.id || 0, // Make sure to handle the case when menuData is null
              name: menuData?.name || '',
              price: menuData?.price || 0,
              quantity: itemQuantity,
            };
            order.push(itemToAdd);
          }
    
          // Update AsyncStorage with the modified order
          await AsyncStorage.setItem('order', JSON.stringify(order));
    
          // Show the modal
          setIsAddToCartModalVisible(true);
        } 
        else {
          const itemToAdd: OrderItem = {
            id: menuData?.id || 0, // Make sure to handle the case when menuData is null
            name: menuData?.name || '',
            price: menuData?.price || 0,
            quantity: itemQuantity,
          };
          order.push(itemToAdd);
          setIsAddToCartModalVisible(true);
        }
  
        // Update AsyncStorage with the modified order
        await AsyncStorage.setItem('order', JSON.stringify(order));
      } catch (error) {
        console.error('Error adding item to order:', error);
      }
    }; 
    console.log(menuData)

    const goToShoppingCart = () => {
      navigation.navigate('shoppingCart'); // Navigate back to the menu or any other appropriate route
    };
    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={{ flex: 1 }}>
      <ScrollView>
            <Stack.Screen options={{headerTitle: `Menu`, headerStyle: {     backgroundColor: '#F8E435'}}}/>
            <Image
                source={require('../../../../assets/breakfastBurrito.jpeg')}
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
        </ScrollView>
        <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
    <View style={styles.actionButtonContainer}>
    <Icon name="minus" style={styles.actionButton}/>
    </View>
  </TouchableOpacity>
  <TextInput
  style={[
    styles.quantityInput,
    { color: itemQuantity === 0 ? 'red' : 'black' },
  ]}
  keyboardType="numeric"
  value={itemQuantity.toString()} // Convert the number to a string for initial value
  onChangeText={(text) => {
    const parsedValue = parseInt(text);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setQuantity(parsedValue);
    } else {
      // Handle the case where the input is not a valid non-negative number
      // For example, you can set a default value or handle it according to your needs
      setQuantity(0); // Set a default value of 1 or handle it based on your requirements
    }
  }}
/>
  <TouchableOpacity onPress={increaseQuantity}>
    <View style={styles.actionButtonContainer}>
    <Icon name="plus" style={styles.actionButton}/>
    </View>
  </TouchableOpacity>
                <TouchableOpacity onPress={addToOrder} disabled={isMenuDataLoading}>
                    <View style={[styles.addToOrderButton, { opacity: isMenuDataLoading ? 0.5 : 1 }]}>
                        <Text style={styles.addToOrderButtonText}>{isMenuDataLoading ? 'Loading...' : 'Add to Order'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        <View style={styles.bottomTab}>
        <TouchableOpacity onPress={goToShoppingCart}>
          <View style={styles.shoppingCartButton}>
            <Text style={styles.shoppingCartButtonText}>View Shopping Cart</Text>
          </View>
        </TouchableOpacity>
        <AddToCartModal visible={isAddToCartModalVisible} onClose={handleCloseAddToCartModal} />
        </View>
        </View>
        </KeyboardAvoidingView>
    );
}

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth * 1.0;

const imageHeight = imageWidth / 1;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
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
    bottomTab: {
      backgroundColor: '#F8E435',
      padding: 10,
      width: '100%',
      alignItems: 'center',
      marginBottom: 0,
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
      borderBottomWidth: 1,
    borderBottomColor: 'black',
    },
    actionButton: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
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
    actionButtonContainer: {
      backgroundColor: '#515D52',
      padding: 8,
      borderRadius: 5,
    },
    quantityInput: {
      fontSize: 20,
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 10,
      width: 50,
      textAlign: 'center',
      backgroundColor: 'white'
    },
  });

export default DetailsPage;

