import { View, Text } from 'react-native';
import React from 'react'; 
import { Redirect, SplashScreen } from 'expo-router';
import { fetchMenuDataAndStore } from '../utils/apiCalls';
import { useEffect } from 'react';

const StartPage = () => {
    useEffect(() => {
        // Call the function to fetch and store data when the app starts
        fetchMenuDataAndStore();
      }, []);
    return <Redirect href={"/home"}/>
};

export default StartPage;