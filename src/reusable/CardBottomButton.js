import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const CardBottomButton = ({onPress, title, titleStyle}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardBottomButton;

const styles = StyleSheet.create({});
