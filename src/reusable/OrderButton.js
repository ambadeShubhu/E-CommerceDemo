import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ripple from 'react-native-material-ripple';

const OrderButton = ({
  priceText,
  rippleStyle,
  textStyle,
  onPress,
  placeOrderText,
  texText,
  grandTotal,
}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.footerStyle}>
        <View>
          {/* <Text style={{color: '#000'}}>sub: ${priceText}</Text>
          <Text style={{color: '#000'}}>tax: ${texText}</Text> */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              color: '#000',
            }}>
            all Total: ${grandTotal}
          </Text>
        </View>

        <Ripple style={rippleStyle} onPress={onPress}>
          <Text style={textStyle}>{placeOrderText}</Text>
        </Ripple>
      </View>
    </View>
  );
};

export default OrderButton;

const styles = StyleSheet.create({
  footerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
