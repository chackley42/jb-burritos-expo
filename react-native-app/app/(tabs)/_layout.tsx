import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import LogoPng from '../../components/LogoImage';
import { StatusBar, StyleSheet } from 'react-native';

export default () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content')
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={tabOptions('JB Burritos', 'home')}
      />
      <Tabs.Screen
        name="shoppingCart"
        options={tabOptions('Shopping Cart', 'shopping-cart')}
      />
      <Tabs.Screen
        name="notifications"
        options={tabOptions('Notifications', 'bell')}
      />
      <Tabs.Screen
        name="profile"
        options={tabOptions('Profile', 'user')}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#F8E435',
  },
  headerTitleStyle: {
    color: '#000000',
    fontSize: 20,
  },
  tabBarStyle: {
    backgroundColor: '#F8E435',
  },
  tabBarLabelStyle: {
    color: '#000000',
  },
});

const tabOptions = (headerTitle, iconName) => ({
  headerShown: true,
  headerTitle: headerTitle,
  headerLeft: () => <LogoPng />,
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
  tabBarShowLabel: false,
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      name={iconName}
      size={focused ? 40 : 30}
      color={focused ? 'black' : 'grey'}
    />
  ),
  tabBarStyle: styles.tabBarStyle,
  tabBarLabelStyle: styles.tabBarLabelStyle,
});
