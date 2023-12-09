import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iosLocalHost from '../utils/testingConsts';


const getCurrentUserName = async (): Promise<string> => {
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
            // Token found, user is logged in
            try {
                // Fetch user details using the token and update the state with the username
                const response = await fetch(`${iosLocalHost}/api/getUsername`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'username': `username ${username}`,
                        'isAdmin': `isAdmin ${isAdmin}`,
                    },
                });
                const userData = await response.json();
                console.log("USERDATA:", userData);

                if (username) {
                    return username;
                } else {
                    console.log("No username found in the response.");
                    return "No Username Found";
                }
            } catch (error) {
                // Handle error while fetching user details
                console.error('Error fetching user details:', error);
                return "Error Fetching User Details";
            }
        } else {
            // Token not found, user is not logged in
            console.log("Token not found. User is not logged in.");
            return "Not Logged In";
        }
    } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
        return "Error Retrieving Token";
    }
};
  export default getCurrentUserName;