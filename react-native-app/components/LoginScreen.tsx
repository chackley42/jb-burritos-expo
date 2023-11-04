import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iosLocalHost from '../utils/testingConsts';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginScreen = () => {
  const [loginData, setLoginData] = useState<LoginFormValues>({
    username: '',
    password: '',
  });

  const navigation = useNavigation(); // Initialize navigation

  const handleCreateAccount = () => {
    // Navigate to the RegistrationScreen when "Create Account" button is pressed
    navigation.navigate('RegistrationScreen');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleUsernameChange = (text: string) => {
    setLoginData({ ...loginData, username: text });
  };

  const handlePasswordChange = (text: string) => {
    setLoginData({ ...loginData, password: text });
  };

  useEffect(() => {
    // Check if user is already logged in (token exists in AsyncStorage)
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // Token found, user is logged in
      try {
        // Fetch user details using the token and update the state with the username
        const response = await fetch(`${iosLocalHost}:8080/api/getUsername`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const userData = await response.json();
        setUsername(userData.username);
      } catch (error) {
        // Handle error while fetching user details
        console.error('Error fetching user details:', error);
      }
    } else {
      // Token not found, user is not logged in
      setIsLoggedIn(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${iosLocalHost}:8080/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save JWT token to AsyncStorage
        await AsyncStorage.setItem('token', data.token);

        // Save the username in AsyncStorage
      await AsyncStorage.setItem('username', loginData.username);
       
        // Update login status and username
        setIsLoggedIn(true);
        setUsername(loginData.username);
        // Handle successful login logic (navigate to home screen, etc.)
        console.log('Login successful!');
      } else {
        // Handle login failure, show error message to the user
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleLogout = async () => {
    // Clear token from AsyncStorage and update login status
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  if (isLoggedIn) {
    // User is logged in, show username and logout button
    return (
      <View style={styles.container}>
        <Text>Welcome, {loginData.username}!</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={loginData.username}
          onChangeText={handleUsernameChange}
        />
  
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={loginData.password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
  
        <Button title="Login" onPress={handleLogin} />
  
        <TouchableOpacity style={styles.signupButton} onPress={handleCreateAccount}>
          <Text style={styles.signupText}>Create Account</Text>
        </TouchableOpacity>
  
        <Text style={styles.orText}>Or sign in with:</Text>
  
        {/* Placeholder for social login buttons */}
        {/* Add buttons for Google, Facebook, Apple login */}
      </View>
    );
  }
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
  signupButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 16,
    color: 'blue', // Customize the color as needed
  },
  orText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default LoginScreen;
