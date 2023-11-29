import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import iosLocalHost from '../../../utils/testingConsts';
import SuccessModal from '../../../components/SuccessModal';
import { Link, Stack } from 'expo-router';
import { CheckBox } from 'react-native-elements';
import ToggleSwitch from '../../../components/toggleSwitch';

interface RegistrationFormValues {
  username: string;
  email: string;
  phonenumber: string;
  password: string;
  isAdmin: boolean; // Add the isAdmin field
}

const RegistrationScreen = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationFormValues>({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
    isAdmin: false, // Initialize isAdmin to false
  });

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    setTapCount(tapCount + 1);

    if (tapCount === 3) {
      // After the third tap, toggle the isAdmin field
      setRegistrationData({ ...registrationData, isAdmin: !registrationData.isAdmin });
      setTapCount(0); // Reset tap count
    }
  };

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

  const toggleIsAdmin = () => {
    setRegistrationData({ ...registrationData, isAdmin: !registrationData.isAdmin });
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false);
  };

  const handleRegistration = async () => {
    try {
      // Convert username to lowercase and remove spaces
      const cleanedUsername = registrationData.username.toLowerCase().trim();
      setRegistrationData({ ...registrationData, username: cleanedUsername })
  
      const response = await fetch(`${iosLocalHost}:8080/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registrationData,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful registration logic (navigate to login screen, show success message, etc.)
        console.log('Registration successful!');
        setRegistrationData({
          username: '',
          email: '',
          phonenumber: '',
          password: '',
          isAdmin: false, // Reset isAdmin to false
        });
        setIsSuccessModalVisible(true);
      } else {
        // Handle registration failure, show error message to the user
        console.log('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'Registration', headerStyle: { backgroundColor: '#F8E435' } }} />
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
<TouchableWithoutFeedback onPress={handleTap}>
<View style={{ height: 20 }} />
</TouchableWithoutFeedback>
        {tapCount === 3 && (
          
          <View style={styles.checkboxContainer}>
            <ToggleSwitch label="Is Admin:" value={registrationData.isAdmin} onValueChange={toggleIsAdmin}/>
          </View>
          
        )}
        <Button title="Register" onPress={handleRegistration} />
        <SuccessModal visible={isSuccessModalVisible} onClose={handleCloseSuccessModal} />
      </ScrollView>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RegistrationScreen;