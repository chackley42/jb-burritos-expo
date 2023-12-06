import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const FailedLoginModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.overlay} />   
        <View style={styles.modalContent}>
          <Text>Username or password incorrect</Text>
          <TouchableOpacity onPress={onClose}>
            <Button title="Close" onPress={onClose} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for darkness
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default FailedLoginModal;