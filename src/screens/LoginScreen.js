import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/action/login.action';
import {tokenSelector} from '../redux/selectors/product.selector';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector, shallowEqual);
  const [auth, setAuth] = useState({email: 'johnd', password: 'm38rmF$'});

  // console.log('token--->', token);
  const onChangeText = (name, value) => {
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const onLogin = () => {
    dispatch(login(auth));
    if (token) {
      navigation.dispatch(StackActions.replace('Stack'));
      // navigation.navigate('Stack');
    } else {
      console.log('-->Login Failed');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#C65D7B'}}>
      <View>
        <LottieView
          style={{width: 400, height: 400}}
          source={require('../assets/lottie/cart.json')}
          autoPlay
          loop
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email."
            placeholderTextColor="#003f5c"
            onChangeText={email => onChangeText('email', email)}
            value={auth.email}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={password => onChangeText('password', password)}
            value={auth.password}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            backgroundColor: '#FFC0CB',
            height: 40,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderWidth: 1,
    borderRadius: 30,
    width: '90%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  imageContainer: {
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'contain',
  },
});
