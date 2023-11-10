import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddToCartModal = ({ visible, onClose }: SuccessModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Item added to shopping cart!</Text>
          <Button title="Close" onPress={onClose} />
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default AddToCartModal;
