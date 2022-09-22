import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({onPress, title, style, textStyle}) => {
  return (
    <View>
      <TouchableOpacity style={style} onPress={onPress}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});

{
  /* <TouchableOpacity
                  style={styles.decrementStyle}
                  onPress={() => decrement(item, index)}>
                  <Text style={{fontSize: 25}}>{'-'}</Text>
                </TouchableOpacity> */
}
