import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface PaymentFormValues {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  zipCode: string;
}

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState<PaymentFormValues>({
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    zipCode: '',
  });

  const handleCardNameChange = (text: string) => {
    setPaymentData({ ...paymentData, cardName: text });
  };

  const handleCardNumberChange = (text: string) => {
    setPaymentData({ ...paymentData, cardNumber: text });
  };

  const handleExpirationDateChange = (text: string) => {
    setPaymentData({ ...paymentData, expirationDate: text });
  };

  const handleCvvChange = (text: string) => {
    setPaymentData({ ...paymentData, cvv: text });
  };

  const handleZipCodeChange = (text: string) => {
    setPaymentData({ ...paymentData, zipCode: text });
  };

  const handleSubmit = () => {
    // Simple form validation: Check if required fields are empty
    if (
      !paymentData.cardName ||
      !paymentData.cardNumber ||
      !paymentData.expirationDate ||
      !paymentData.cvv ||
      !paymentData.zipCode
    ) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
    } else {
      // Handle form submission, e.g., send data to a server or perform some action
      console.log('Card Name:', paymentData.cardName);
      console.log('Card Number:', paymentData.cardNumber);
      console.log('Expiration Date:', paymentData.expirationDate);
      console.log('CVV:', paymentData.cvv);
      console.log('Zip Code:', paymentData.zipCode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name on Card:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name on card"
        value={paymentData.cardName}
        onChangeText={handleCardNameChange}
      />

      <Text style={styles.label}>Card Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card number"
        value={paymentData.cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Expiration Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/YY"
        value={paymentData.expirationDate}
        onChangeText={handleExpirationDateChange}
      />

      <Text style={styles.label}>CVV:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter CVV"
        value={paymentData.cvv}
        onChangeText={handleCvvChange}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Zip Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter zip code"
        value={paymentData.zipCode}
        onChangeText={handleZipCodeChange}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
  },
});

export default PaymentForm;