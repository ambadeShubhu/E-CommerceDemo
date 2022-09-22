import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import AddToFav from './screens/AddToFav';
import Cart from './screens/Cart';
import UserPro from './screens/UserPro';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {cartItemSelector} from '../src/redux/selectors/product.selector';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home(params) {
  const cartProductData = useSelector(cartItemSelector, shallowEqual);
  const [counter, setCounter] = useState(0);
  // console.log('cartProductData=====', cartProductData[0].cartItem.qty);
  let count = cartProductData.map((item, index) => {
    return item.cartItem.qty;
  });

  console.log('-count----', count);

  const cartCount = count.reduce((a, b) => a + b, 0);

  console.log(cartCount);

  useEffect(() => {
    setCounter(cartCount);
  }, [cartCount]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconSize;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
            iconSize = focused ? 40 : 25;
          } else if (route.name === 'AddToFav') {
            iconName = focused ? 'heart' : 'heart-outline';
            iconSize = focused ? 40 : 25;
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
            iconSize = focused ? 40 : 25;
          } else if (route.name === 'UserPro') {
            iconName = focused ? 'person' : 'person-outline';
            iconSize = focused ? 40 : 25;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: route.name === 'UserPro' ? '#00BFFF' : '#C65D7B',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Product List',
          headerStyle: {backgroundColor: '#C65D7B'},
        }}
      />
      <Tab.Screen
        name="AddToFav"
        component={AddToFav}
        options={{tabBarBadge: 3, headerStyle: {backgroundColor: '#C65D7B'}}}
        initialParams={params}
      />
      <Tab.Screen
        options={{
          tabBarBadge: counter,
          headerStyle: {backgroundColor: '#C65D7B'},
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          title: 'Profile',
          headerStyle: {backgroundColor: '#00BFFF'},
        }}
        name="UserPro"
        component={UserPro}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // options={{
          //   title: 'Login Screen',
          //   headerStyle: {backgroundColor: '#eee'},
          // }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login Screen',
            headerStyle: {backgroundColor: '#eee'},
          }}
        />
        <Stack.Screen
          name="Stack"
          component={Home}
          options={{
            title: 'Product List',
            headerStyle: {backgroundColor: '#eee'},
          }}
        />
        <Stack.Screen
          name="PlaceOrderScreen"
          component={PlaceOrderScreen}
          // options={{
          //   title: 'Product List',
          //   headerStyle: {backgroundColor: '#eee'},
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
