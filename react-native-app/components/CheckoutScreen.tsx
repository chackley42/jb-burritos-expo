import { useState, useEffect } from "react";
import {useStripe} from '@stripe/stripe-react-native';
import iosLocalHost from "../utils/testingConsts";
import { Screen } from "react-native-screens";
import { Button } from "react-native-elements";
import { Alert } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

const publishableKey = 'pk_test_51OJkAOLiow7igI3q9tXMLYfYrx76Mf1txAmsC0A7ECdPbUFGIA15VgWGYZ7TsI2MXp6teVQvpA6uAxRiuJpZpZHa00Q6ZTMyJV'

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${iosLocalHost}:8080/api/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }
      };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
        <StripeProvider
      publishableKey="pk_test_51OJkAOLiow7igI3q9tXMLYfYrx76Mf1txAmsC0A7ECdPbUFGIA15VgWGYZ7TsI2MXp6teVQvpA6uAxRiuJpZpZHa00Q6ZTMyJV"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Screen>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </Screen>
      </StripeProvider>
    );
  }