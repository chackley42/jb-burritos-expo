import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import iosLocalHost from '../../../utils/testingConsts';

interface RegistrationFormValues {
  username: string;
  email: string;
  phonenumber: string;
  password: string;
}

const RegistrationScreen = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationFormValues>({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
  });

  const handleUsernameChange = (text: string) => {
    setRegistrationData({ ...registrationData, username: text });
  };

  const handleEmailChange = (text: string) => {
    setRegistrationData({ ...registrationData, email: text });
  };

  const handlePhonenumberChange = (text: string) => {
    setRegistrationData({ ...registrationData, phonenumber: text });
  };

  const handlePasswordChange = (text: string) => {
    setRegistrationData({ ...registrationData, password: text });
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch(`${iosLocalHost}:8080/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration logic (navigate to login screen, show success message, etc.)
        console.log('Registration successful!');
      } else {
        // Handle registration failure, show error message to the user
        console.log('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={registrationData.username}
        onChangeText={handleUsernameChange}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={registrationData.email}
        onChangeText={handleEmailChange}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={registrationData.phonenumber}
        onChangeText={handlePhonenumberChange}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={registrationData.password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegistration} />
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

export default RegistrationScreen;
