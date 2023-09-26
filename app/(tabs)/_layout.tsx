//Tab Bar
import React from 'react';
import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F8E435',
          },
          tabBarLabelStyle: {
            color: '#000000',
          },
        }}
      />
      <Tabs.Screen
        name="shoppingCart"
        options={{
          tabBarStyle: {
            backgroundColor: '#F8E435',
          },
          tabBarLabelStyle: {
            color: '#000000',
          },
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarStyle: {
            backgroundColor: '#F8E435',
          },
          tabBarLabelStyle: {
            color: '#000000',
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarStyle: {
            backgroundColor: '#F8E435',
          },
          tabBarLabelStyle: {
            color: '#000000',
          },
        }}
      />
    </Tabs>
  );
};