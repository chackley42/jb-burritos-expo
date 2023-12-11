import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import CaterForm from '../../../components/CaterForm';
import Logo from '../../../components/Logo';
import { Link, Stack } from 'expo-router';

const cater = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Catering Requests', headerStyle: { backgroundColor: '#F5A800' } }} />
      <CaterForm></CaterForm>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default cater;