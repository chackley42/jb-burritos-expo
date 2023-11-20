import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import LogoPng from '../../components/LogoImage';
import { StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAdminContext } from '../../utils/AdminContext';

export default () => {
  
  //const { isAdmin, setAdminStatus} = useAdminContext();

  const {isAdmin, setAdminStatus} = useAdminContext();
  async function fetchIsAdmin() {
    try {
      const isAdminValue = await AsyncStorage.getItem('isAdmin');
      if (isAdminValue !== null) {
        setAdminStatus(isAdminValue === 'true');
      }
    } catch (error) {
      console.error('Error retrieving isAdmin from AsyncStorage:', error);
    }
  }


  useEffect(() => {
    console.log('TABS LAYOUT USE EFFECT CALLED HOOOOOOOOORAYYYYYYY')
    fetchIsAdmin();
  }, [isAdmin]);

  useEffect(() => {
    fetchIsAdmin()
    StatusBar.setBarStyle('dark-content');
  }, [isAdmin]);

  const adminStyles = isAdmin
    ? {
        headerStyle: styles.adminHeaderStyle,
        headerTitleStyle: styles.adminHeaderTitleStyle,
        tabBarStyle: styles.adminTabBarStyle,
        tabBarLabelStyle: styles.adminTabBarLabelStyle,
      }
    : {
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      };

  return (
    <Tabs>
      <Tabs.Screen name="home" options={tabOptions('JB Burritos', 'home', adminStyles)} />
      <Tabs.Screen
        name="shoppingCart"
        options={tabOptions('Shopping Cart', 'shopping-cart', adminStyles)}
      />
      <Tabs.Screen
        name="notifications"
        options={tabOptions('Notifications', 'bell', adminStyles)}
      />
      {/* {isAdmin && (
        <Tabs.Screen
          name="admin"
          options={tabOptions('Admin', 'cog', adminStyles)} // Adjust icon and label as needed
        />
      )} */}
      <Tabs.Screen
        name="profile"
        options={tabOptions('Profile', 'user', adminStyles)}
      />
    </Tabs>
  );
};

const tabOptions = (headerTitle, iconName, styles) => ({
  headerShown: true,
  headerTitle: headerTitle,
  headerLeft: () => <LogoPng />,
  ...styles, // Spread the styles object to apply the appropriate styles
  tabBarShowLabel: false,
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      name={iconName}
      size={focused ? 40 : 30}
      color={focused ? 'black' : 'grey'}
    />
  ),
});

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
  adminHeaderStyle: {
    backgroundColor: '#34eb8f',
  },
  adminHeaderTitleStyle: {
    color: '#000000',
    fontSize: 20,
  },
  adminTabBarStyle: {
    backgroundColor: '#34eb8f',
  },
  adminTabBarLabelStyle: {
    color: '#000000',
  },
});
