import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View, Button, TouchableOpacity } from 'react-native';

const PaymentModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // Implement logic to handle the form submission (e.g., send data to a server)
    // For demonstration purposes, you can just show an alert with the entered data
    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      phoneNumber,
    };
    Alert.alert('Payment Data', JSON.stringify(paymentData));
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            <Text style={styles.modalText}>Enter Payment Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="black"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              placeholderTextColor="black"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={(text) => setExpiryDate(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              placeholderTextColor="black"
              keyboardType="numeric"
              value={cvv}
              onChangeText={(text) => setCVV(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="black"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
      <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.addToOrderButton}>
        <Text style={styles.addToOrderButtonText}>Enter Payment Details</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 95,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  buttonClose: {
    backgroundColor: '#2196F3',
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: "black",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default PaymentModal;
