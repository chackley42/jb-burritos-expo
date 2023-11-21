import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iosLocalHost from '../utils/testingConsts';
import FailedLoginModal from './FailedLoginModal';
import { isError } from 'lodash';
import { useAdminContext } from '../utils/AdminContext';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginScreen = () => {
  const { isAdminGlobal, setAdminStatus } = useAdminContext();


  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [loginData, setLoginData] = useState<LoginFormValues>({
    username: '',
    password: '',
  });

  const handleAdminButtonClick = () => {
    // Navigate to the "/admin-home" route
    navigation.navigate(<Redirect href={"/admin-home"}/>);
    // return (
    // <Redirect href={"/admin-home"}/>
    // )
  };

  const toggleErrorModal = () => {
    console.log('TOGGLE ERROR MODAL CALLED')
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  const navigation = useNavigation(); // Initialize navigation

  const handleCreateAccount = () => {
    // Navigate to the RegistrationScreen when "Create Account" button is pressed
    navigation.navigate('RegistrationScreen');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');

  const handleUsernameChange = (text: string) => {
    setLoginData({ ...loginData, username: text });
  };

  const handlePasswordChange = (text: string) => {
    setLoginData({ ...loginData, password: text });
  };

  useEffect(() => {
    console.log('USE-EFFECT LOGIN SCREEN LOGIN SCREEN')
    // Check if user is already logged in (token exists in AsyncStorage)
    checkLoggedInStatus();
  }, [isLoggedIn]);

  const checkLoggedInStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username'); // Get the username from AsyncStorage
  
    if (token && username) {
      try {
        const response = await fetch(`${iosLocalHost}:8080/api/getUsername/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userDataArray = await response.json();
        if (userDataArray.length > 0) {
          const userData = userDataArray[0]; // Access the first element of the array
          console.log('THIS IS MY USERDATA', userData);
  
          // Save isAdmin directly without comparison
          await AsyncStorage.setItem('isAdmin', userData.isAdmin.toString());
          setIsLoggedIn(true)
          setUsername(userData.username);
          setEmail(userData.email);
          setPhoneNumber(userData.phonenumber)
          console.log('SET THE FOLLOWING INFORMATION' + email, phonenumber, username)
          // await AsyncStorage.getItem("isAdmin")
          //setIsAdmin(userData.isAdmin)
          if (await AsyncStorage.getItem('isAdmin') === "true"){
            setIsAdmin(true)
            setAdminStatus(true);
          }
        } else {
          console.error('User not found');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    } else {
      setIsLoggedIn(false);
      //setIsErrorModalVisible(true)
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

        //setIsAdmin(loginData.isAdmin);
        // Handle successful login logic (navigate to the home screen, etc.)
        checkLoggedInStatus()
        // console.log('Login successful!');
        // console.log(loginData.username);
        //console.log('isAdmin:' + loginData.isAdmin);
      } else {
        // Handle login failure, show an error message to the user
        setIsErrorModalVisible(true);
        //toggleErrorModal();
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleLogout = async () => {
    // Clear token from AsyncStorage and update login status
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('isAdmin');
    setLoginData({ ...loginData, username: "" })
    setLoginData({ ...loginData, password: "" })
    setIsAdmin(false)
    setIsLoggedIn(false);
    setAdminStatus(false)
  };

  const viewShoppingCart = () => {
    navigation.navigate('shoppingCart');
  };



  if (isLoggedIn) {
    // User is logged in, show username and logout button
    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.userIconContainer}>
            {/* <Image
              source={require('../assets/user-icon.jpeg')}
              style={styles.userIcon}
            /> */}
          <TouchableOpacity onPress={viewShoppingCart}>
            <View style={styles.shoppingCartButton}>
              <Text style={styles.shoppingCartButtonText}>View Shopping Cart</Text>
            </View>
          </TouchableOpacity>
          </View>
          <Text style={styles.userInfo}>Account Details</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoName}>Username</Text>
        <Text style={styles.userInfo}>{username}</Text>
        <Text style={styles.userInfoName}>Email</Text>
        <Text style={styles.userInfo}>{email}</Text>
        <Text style={styles.userInfoName}>Phone Number</Text>
        <Text style={styles.userInfo}>{phonenumber}</Text>
      </View>
        {isAdmin && (
          <View style={styles.adminContainer}>
            <Text style={styles.userInfo}>Admin Features Unlocked</Text>
          <Text style={styles.adminInfo}>Welcome admin, {username}!</Text>
          <TouchableOpacity onPress={handleAdminButtonClick}>
        <Text>Go to Admin Home</Text>
      </TouchableOpacity>

        </View>
      )}
        <Button title="Logout" onPress={handleLogout} />
      </View>
      </ScrollView>
    );
  // } else if (isLoggedIn && isAdmin){
  //   //new logic here 
  //   return (
  //     <Redirect href={"/admin-home"}/>
  //   )
    
   }
  else {
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

      <FailedLoginModal isVisible={isErrorModalVisible} onClose={toggleErrorModal} />
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
    color: 'blue',
  },
  orText: {
    fontSize: 16,
    marginTop: 10,
  },
  userInfo: {
    fontSize: 22,
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoName: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#FFFCE5',
    alignItems: 'center',
  },
  adminInfo: {
    fontSize: 20,
    marginBottom: 10,
  },
  adminContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#515D52', 
    backgroundColor: '#f0f0f0',
  },
  userIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  shoppingCartButton: {
    backgroundColor: '#515D52',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft: 10,
    marginHorizontal: 20,
  },
  shoppingCartButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default LoginScreen;

