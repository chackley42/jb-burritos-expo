//Root Layout
//Uses Stack
import React from 'react';
import { Stack } from 'expo-router';
import { AdminProvider } from '../utils/AdminContext';


const StackLayout = () => {
    return (
        <AdminProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ 
                headerShown: false,
                }}/>
        </Stack>
        </AdminProvider>
    )
}

export default StackLayout;