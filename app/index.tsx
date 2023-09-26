import { View, Text } from 'react-native';
import React from 'react'; 
import { Redirect, SplashScreen } from 'expo-router';

const StartPage = () => {
    return <Redirect href={"/home"}/>
};

export default StartPage;