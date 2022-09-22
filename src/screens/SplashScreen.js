import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {tokenSelector} from '../redux/selectors/product.selector';
import {shallowEqual, useSelector} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({navigation}) => {
  const token = useSelector(tokenSelector, shallowEqual);

  useEffect(() => {
    if (!token) {
      // console.log('log--->', token);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('Login'));
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('Stack'));
      }, 2000);
    }
  }, []);

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View>
        <LottieView
          style={{width: 400, height: 400}}
          source={require('../assets/lottie/splash.json')}
          autoPlay
          loop
        />
      </View>
      <View style={{}}>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>
          Welcome TO S-Kart
        </Text>
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
