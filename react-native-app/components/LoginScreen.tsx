import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginScreen = () => {
  const [loginData, setLoginData] = useState<LoginFormValues>({
    username: '',
    password: '',
  });

  const handleUsernameChange = (text: string) => {
    setLoginData({ ...loginData, username: text });
  };

  const handlePasswordChange = (text: string) => {
    setLoginData({ ...loginData, password: text });
  };

  const handleLogin = () => {
    // Handle login logic here, e.g., validate credentials
    console.log('Username:', loginData.username);
    console.log('Password:', loginData.password);
  };

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

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with:</Text>

      {/* Placeholder for social login buttons */}
      {/* Add buttons for Google, Facebook, Apple login */}
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
