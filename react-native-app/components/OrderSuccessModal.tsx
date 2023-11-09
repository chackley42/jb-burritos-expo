import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const OrderSuccessModal = ({ visible, onClose, onGoToNotifications }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
          <Text>Your order was successfully placed!</Text>
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
export default OrderSuccessModal;