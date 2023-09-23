import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const list = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Link href="/list/1">Item One</Link>
            <Link href="/list/2">Item Two</Link>
            <Link href="/list/3">Item Three</Link>
        </View>
    )
}

export default list