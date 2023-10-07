import React from 'react';
import { Stack } from 'expo-router';

const StackLayout = () => {
    return (
        <Stack>
            {/* name attribute must match a file within current directory  */}
            <Stack.Screen name="index" options={{ 
                headerShown: false,
                }}/>
        </Stack>
    )
}

export default StackLayout;