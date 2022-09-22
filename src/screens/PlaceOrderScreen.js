import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ApplePayButton, PaymentRequest} from 'react-native-payments';
import {useRoute} from '@react-navigation/native';

const PlaceOrderScreen = () => {
  const route = useRoute();

  const [debug, setDebug] = useState('');

  const debug2 = text => {
    setDebug(text);
  };

  const showPaymentSheet = (succeed = true) => {
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest
      .show()
      .then(paymentResponse => {
        const card_token = paymentResponse.details.paymentToken;

        if (succeed) {
          paymentResponse.complete('success');
          debug2(`Payment request completed with card token ${card_token}`);
        } else {
          paymentResponse.complete('failure');
          debug2('Payment request failed');
        }
      })
      .catch(error => {
        if (error.message === 'AbortError') {
          debug2('Payment request was dismissed');
        }
      });
  };

  let items = route.params.orderPlaced;
  let selectedData;
  const selectedItem = items.filter((item, index) => {
    selectedData = item;
    return item.title;
  });

  console.log('----selectedData ---', selectedItem);
  console.log('----selectedData ---', selectedData);

  const DETAILS = {
    id: 'basic-example',
    displayItems: [
      {
        label: selectedData?.title,
        amount: {currency: 'INR', value: selectedData?.price},
      },
    ],
    total: {
      label: selectedData?.title,
      amount: {currency: 'INR', value: selectedData?.price},
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      {/* <Text style={styles.title}>Native Apple Pay Button</Text> */}
      <View
        style={{
          bottom: 0,
          flex: 1,
          justifyContent: 'center',
        }}>
        <ApplePayButton
          type="plain"
          style="black"
          onPress={() => showPaymentSheet(true)}
        />
      </View>
      {debug.length > 0 && (
        <View style={styles.debug}>
          <Text style={styles.debugText}>{debug}</Text>
        </View>
      )}
      {/* <Text style={styles.title}>Any tappable component</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showPaymentSheet(true)}>
            <Text style={styles.buttonText}>Tap me</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Try an error...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showPaymentSheet(false)}>
            <Text style={styles.buttonText}>This will fail</Text>
          </TouchableOpacity>
          <Text style={styles.title}>What's next?</Text>
          <Text style={styles.details}>
            Thanks for trying out react-native-payments! There are so many
            options you can pass to PaymentRequest, so check out the main
            documentation.
          </Text>
          <Text style={styles.details}>
            You can also pass in paymentMethodTokenizationParameters to
            automatically convert the Apple Pay token to either Stripe or
            Braintree format.
          </Text>
          {this.state.debug.length > 0 && (
            <View style={styles.debug}>
              <Text style={styles.debugText}>{this.state.debug}</Text>
            </View>
          )} */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

// const METHOD_DATA = [
//   {
//     supportedMethods: ['apple-pay'],
//     data: {
//       merchantIdentifier: 'merchant.com.productlist.namespace',
//       supportedNetworks: ['visa', 'mastercard', 'amex'],
//       countryCode: 'US',
//       currencyCode: 'INR',
//       // // uncomment this block to activate automatic Stripe tokenization.
//       // // try putting your key pk_test... in here and see how the token format changes.
//       // paymentMethodTokenizationParameters: {
//       // 	parameters: {
//       // 		gateway: 'stripe',
//       // 		'stripe:publishableKey': Config.STRIPE_KEY,
//       // 	},
//       // },
//     },
//   },
// ];

const METHOD_DATA = [
  {
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: 'merchant.com.your-app.namespace',
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'USD',
    },
  },
];

const MARGIN = 20;

const styles = {
  container: {
    margin: MARGIN,
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    margin: MARGIN,
    marginTop: (MARGIN * 3) / 2,
    color: '#4000FF',
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4000FF',
    padding: MARGIN,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  debug: {
    marginTop: 'auto',
    backgroundColor: '#301139',
    padding: MARGIN,
    borderRadius: 3,
  },
  debugText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Menlo',
  },
  details: {
    marginBottom: MARGIN,
    fontSize: 16,
  },
};

export default PlaceOrderScreen;
