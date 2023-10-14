import React from 'react';
import { Stack } from 'expo-router';
import ProfileBtn from '../../../components/ProfileBtn';
import Logo from '../../../components/Logo';
import { Image } from 'react-native';
import LogoPng from '../../../components/LogoImage';

//THIS CURRENTLY DOES NOT SHOW AS A HEADER, BUT IT HERE FOR LAYOUT PURPOSES OF HOME PAGE

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'JB Burritos',
          headerShown: false,
          headerRight: () => <LogoPng />,
          headerStyle: {
            backgroundColor: '#F8E435',
          },
          headerTitleStyle: {
            color: '#000000',
            fontSize: 20
          },
        }}
      />
    </Stack>
  );
};

export default StackLayout;