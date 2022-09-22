import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Cart = ({source, children, onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContainerInner}>
          <View>
            <Image
              style={styles.productImage}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
              }}
            />
          </View>

          {/* <View>
            <Text>CAMPUS BOOMER shoe</Text>
            <Text>CAMPUS 500 /-</Text>
            <Text>CAMPUS BOOMER shoe</Text>
          </View> */}
          {children}
        </View>

        <View style={styles.bottomBtnContainer}>
          <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text>Save for later</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <Text>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <Text>Buy this now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#eee',
  },
  cardContainer: {backgroundColor: '#fff', width: '100%'},
  cardContainerInner: {flexDirection: 'row', alignItems: 'center'},
  productImage: {width: 150, height: 150, resizeMode: 'contain'},
  bottomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  btn: {},
});
