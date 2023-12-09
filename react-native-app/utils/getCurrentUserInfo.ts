import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iosLocalHost from '../utils/testingConsts';

export interface UserData {
    username: string;
    email: string;
    isAdmin: boolean;
    phonenumber: string; // New property
    // Add other properties as needed
  }

  export interface UserInfoResponse {
    data?: UserData;
    error?: string;
  }

  const getCurrentUserInfo = async (): Promise<UserInfoResponse> => {
    console.log("GETUSERNAME CALLED");
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("TOKEN:", token);
      const username = await AsyncStorage.getItem('username');
      console.log("USERNAME:", username);
      const isAdmin = await AsyncStorage.getItem('isAdmin');
      console.log("ISADMIN:", isAdmin);
  
      if (token) {
        console.log("IF STATEMENT REACHED");
        try {
          const response = await fetch(`${iosLocalHost}/api/getUsername/${username}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'username': `username ${username}`,
              'isAdmin': `isAdmin ${isAdmin}`,
            },
          });
  
          const userDataArray = await response.json();
          console.log("USERDATA:", userDataArray);
  
          if (username) {
            // Check if the response array is not empty
            if (userDataArray.length > 0) {
              const userData = userDataArray[0];
              // Create an object with user data and return it
              const userInfo: UserData = {
                username: userData.username,
                email: userData.email,
                isAdmin: userData.isAdmin,
                phonenumber: userData.phonenumber,
                // Add other properties as needed
              };
  
              return { data: userInfo };
            } else {
              console.log("No user data found in the response.");
              return { error: "No User Data Found" };
            }
          } else {
            console.log("No username found in AsyncStorage.");
            return { error: "No Username in AsyncStorage" };
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          return { error: "Error Fetching User Details" };
        }
      } else {
        console.log("Token not found. User is not logged in.");
        return { error: "Not Logged In" };
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
      return { error: "Error Retrieving Token" };
    }
  };
  
  

export default getCurrentUserInfo;
