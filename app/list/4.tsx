import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const item4 = () => {
  const [quantity, setQuantity] = useState(1);

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

  return (
    <View>
      <Image
        source={require('../../images/fries.jpeg')}
        style={styles.image}
      />
      <View style={styles.tab}>
        <Text style={styles.tabText}>Fries</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>250 Calories</Text>
        <Text style={styles.infoText}>Made with fresh potatoes, and salt.</Text>
        <Text style={styles.infoText}>$2.00</Text>
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
    </View>
  );
};

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
  
  export default item4;