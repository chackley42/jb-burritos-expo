import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  numberOfPeople: string;
  comments: string;
}

const CaterForm = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    phoneNumber: '',
    numberOfPeople: '',
    comments: '',
  });

  const handleNameChange = (text: string) => {
    setFormData({ ...formData, name: text });
  };

  const handleEmailChange = (text: string) => {
    setFormData({ ...formData, email: text });
  };

  const handlePhoneNumberChange = (text: string) => {
    const formattedPhoneNumber = text
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    setFormData({ ...formData, phoneNumber: formattedPhoneNumber });
  };

  const handleNumberOfPeopleChange = (text: string) => {
    setFormData({ ...formData, numberOfPeople: text });
  };

  const handleCommentsChange = (text: string) => {
    setFormData({ ...formData, comments: text });
  };

  const handleSubmit = () => {
    // Simple form validation: Check if required fields are empty
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.numberOfPeople) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
    } else {
      // Handle form submission, e.g., send data to a server or perform some action
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Phone Number:', formData.phoneNumber);
      console.log('Number of People Served:', formData.numberOfPeople);
      console.log('Comments/Questions:', formData.comments);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={formData.name}
        onChangeText={handleNameChange}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}># of People to serve:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the number of people served"
        value={formData.numberOfPeople}
        onChangeText={handleNumberOfPeopleChange}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Comments/Questions:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your comments or questions"
        value={formData.comments}
        onChangeText={handleCommentsChange}
        multiline
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  },
});

export default CaterForm;
