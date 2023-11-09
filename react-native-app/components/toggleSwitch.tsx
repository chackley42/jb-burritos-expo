import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ToggleSwitch = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
});

export default ToggleSwitch;