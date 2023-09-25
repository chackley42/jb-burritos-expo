import React from 'react';
import { Stack } from 'expo-router';
import ProfileBtn from '../../../components/ProfileBtn';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'JB Burritos',
          headerStyle: {
            backgroundColor: '#F8E435',
          },
          headerTitleStyle: {
            color: '#000000',
            fontSize: 24
          },
        }}
      />
    </Stack>
  );
};

export default StackLayout;