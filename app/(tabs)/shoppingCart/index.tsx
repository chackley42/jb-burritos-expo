import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMenuData } from '../../../utils/storage';

const shoppingCart = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  useEffect(() => {
    const menuData = getMenuData();

    const selectedMenuItemIds = [1, 2, 3];

    const selectedItems = selectedMenuItemIds.map((itemId) =>
      menuData.burritos.find((item) => item.id === itemId)
    );

    setSelectedMenuItems(selectedItems);
  }, []);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToOrder = () => {
    
  };

  const payment = () => {
    navigation.navigate('payment');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedMenuItems[0] && (
        <View key={selectedMenuItems[0].id} style={[styles.subTab]}>
          <Text>{selectedMenuItems[0].name}</Text>
          <View style={styles.quantityContainer}>
          <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Text style={styles.actionButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <Text style={styles.actionButton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="trash" size={24} />
        </TouchableOpacity>

        
          <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${selectedMenuItems[2].price.toFixed(2)}</Text>
          </View>
      </View>
          </View>
        </View>
      )}

      {selectedMenuItems[1] && (
        <View key={selectedMenuItems[1].id} style={[styles.subTab]}>
          <Text>{selectedMenuItems[1].name}</Text>
          <View style={styles.quantityContainer}>
          <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Text style={styles.actionButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <Text style={styles.actionButton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="trash" size={24} />
        </TouchableOpacity>

        
          <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${selectedMenuItems[2].price.toFixed(2)}</Text>
          </View>
      </View>
          </View>
        </View>
      )}

      {selectedMenuItems[2] && (
        <View key={selectedMenuItems[2].id} style={[styles.subTab]}>
          <Text>{selectedMenuItems[2].name}</Text>
          <View style={styles.quantityContainer}>
          <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Text style={styles.actionButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <Text style={styles.actionButton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="trash" size={24} />
        </TouchableOpacity>

        
          <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${selectedMenuItems[2].price.toFixed(2)}</Text>
          </View>
      </View>
          </View>
        </View>
      )}
      <View style={[styles.totalTabContainer]}>
          <Text>Subtotal: $10.50</Text>
          <Text>Taxes: $0.76</Text>
          <Text>Total: $11.26</Text>
        </View>

      <View style={styles.tab}>
        <TouchableOpacity onPress={payment}>
          <View style={styles.addToOrderButton}>
            <Text style={styles.addToOrderButtonText}>Proceed To Payment</Text>
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
  totalTabContainer: {
    backgroundColor: '#F8E435',
    padding: 30,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#FFFCE5',
  },
  actionButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
  },
  priceContainer: {
    backgroundColor: '#FFFCE5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  priceText: {
    color: '#000000',
    fontSize: 18,
  },
  addToOrderButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addToOrderButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default shoppingCart;
