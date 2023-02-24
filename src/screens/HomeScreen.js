import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';

import {productList} from '../redux/action/product.action';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  cartItemSelector,
  favoriteItemSelector,
  productListSelector,
} from '../redux/selectors/product.selector';
import {ToggleModal} from '../reusable/Model';
import {cartList} from '../redux/action/cart.action';
import {favItemList, removeFavItemList} from '../redux/action/favorite.action';

import {AnimateMany} from 'react-native-entrance-animation';

import {showNotification, handleScheduledNotification, handleCancelNotification} from '../notifications/notification.android'
import messaging from "@react-native-firebase/messaging";

const HomeScreen = () => {
  const navigation = useNavigation();
  const favItemData = useSelector(favoriteItemSelector, shallowEqual);
  const cartProductData = useSelector(cartItemSelector, shallowEqual);
  const dispatch = useDispatch();
  const productData = useSelector(productListSelector, shallowEqual);
  // const itemCart = useSelector(cartItemSelector, shallowEqual);

  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState(
    <Icon name="grid" size={30} color={'#C65D7B'} />,
  );

  const [favoriteList, setFavoruiteList] = useState([]);
  const [cartItemList, setCartItemList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [gridColumn, setGridColumn] = useState(true);
  let demoImage =
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

  const isFocused = useIsFocused();

  const [counter, setCounter] = useState(0);
  // console.log('cartProductData=====', cartProductData[0].cartItem.qty);
  let count = cartProductData.map((item, index) => {
    return item.cartItem.qty;
  });

  const cartCount = count.reduce((a, b) => a + b, 0);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmToken = await messaging().getToken();
      console.log("FCM token arrived-->", fcmToken);
      // setDeviceToken(fcmToken);
    }
  }

  useEffect(()=>{
    requestUserPermission();

      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
      });

      // Check whether an initial notification is available
        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
          setLoading(false);
      }); 

      // for foreground notification
      // messaging().onMessage(remoteMessage => {
      //   console.log(
      //     'Notification caused app to open from background state:',
      //     remoteMessage.notification,
      //   );
      //   navigation.navigate(remoteMessage.data.type);
      // });
       messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage.notification,);
      });
      // return unsubscribe;

  },[])

  useEffect(() => {
    setCounter(cartCount);
  }, [cartCount, isFocused]);

  useEffect(() => {
    setLoading(true);
    dispatch(productList(limit));
    setLoading(false);
  }, [limit, isFocused]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const modalOpen = item => {
    setModalData(item);
    toggleModal();
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.noDataFound}>
        <Text style={styles.noDataFoundText}>No Data Found..!</Text>
      </View>
    );
  };

  const Item = item => {
    const {id, title, price, description, category, image, rating, count} =
      item;

    return (
      <View
        style={[
          styles.itemStyle,
          {
            width: gridColumn ? '90%' : '45%',
            marginHorizontal: gridColumn ? 18 : 10,
          },
        ]}>
          
        <TouchableOpacity style={{}} onPress={() => modalOpen(item)}>
          <View
            style={[
              styles.productImgContainer,
              {width: gridColumn ? 350 : 200},
            ]}>
            <Image
              style={styles.productImage}
              source={{
                uri: image || demoImage,
              }}
            />

            <TouchableOpacity
              style={[
                styles.icon,
                {right: gridColumn ? 10 : 20, top: gridColumn ? 10 : 1},
              ]}
              onPress={() =>
                ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)
              }>
              <Icon
                name={ifExists(item) ? 'heart' : 'heart-outline'}
                size={gridColumn ? 32 : 22}
                color={'#C65D7B'}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.informationContainer}>
          <View style={{flex: 1}}>
            <Text>{category}</Text>
            <Text style={{fontSize: 14, marginTop: 4}}>{title}</Text>
            <Text style={{fontSize: 16, marginTop: 4, fontWeight: 'bold'}}>
              ${price}
            </Text>
          </View>

          <View style={styles.ratingStyleContainer}>
            <Text
              style={[
                styles.ratingStyle,
                {
                  color: rating > 3 ? 'green' : 'orange',
                  borderColor: rating > 3 ? 'green' : 'orange',
                },
              ]}>
              {rating}
            </Text>
          </View>
        </View>
        <ToggleModal
          isVisible={isModalVisible}
          backdropColor={'#eee'}
          backdropOpacity={0.7}
          // onSwipeComplete={() => toggleModal()}
          onBackdropPress={() => toggleModal()}
          toggleModal={toggleModal}
          data={modalData}
          addToCart={() => addItemCart(modalData)}
        />
      </View>
    );
  };

  const addItemCart = item => {
    let productItem = {...item, qty: 1, tax: 6};
    dispatch(cartList(productItem));
    setCartItemList([...cartItemList, item]);

    Toast.show({
      type: 'success',
      text1: `${item.title}`,
      text2: `Item Added to Cart`,
    });
    toggleModal();
  };

  const onFavorite = addProducts => {
    dispatch(favItemList(addProducts));
    setFavoruiteList([...favoriteList, addProducts]);
    Toast.show({
      type: 'success',
      text1: `${addProducts.title}`,
      text2: `added to Favorite`,
    });
  };

  const onRemoveFavorite = removeProducts => {
    dispatch(removeFavItemList(removeProducts));
    const filteredList = favoriteList.filter(
      item => item.id !== removeProducts.id,
    );
    setFavoruiteList(filteredList);
    Toast.show({
      type: 'error',
      text1: `${removeProducts.title}`,
      text2: `removed from Favorite`,
    });
  };

  // function to check if an item exists in the favorite list or not
  const ifExists = exists => {
    if (favoriteList.filter(item => item.id === exists.id).length > 0) {
      return true;
    }
    return false;
  };

  const renderItem = ({item}) => {
    return (
      <Item
        id={item.id}
        title={item.title}
        price={item.price}
        image={item.image}
        category={item.category}
        rating={item.rating.rate}
        count={item.rating.count}
        description={item.description}
      />
    );
  };

  const handlePaggination = () => {
    if (productData.lenght !== limit) {
      setLimit(limit + 10);
    }
  };

  const handleLisView = () => {
    if (gridColumn === true) {
      setGridColumn(false);
      setBtnText(<Icon name="list" size={30} color={'#C65D7B'} />);
    } else {
      setGridColumn(true);
      setBtnText(<Icon name="grid" size={30} color={'#C65D7B'} />);
    }
  };

  const renderFooter = () => {
    if (productData.lenght == limit) {
      return;
    } else {
      return (
        <View style={{height: 45}}>
          <Text>loading please wait</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
       <TouchableOpacity onPress={()=> showNotification('hello', 'shubham')}>
          <Text>get notification</Text>
        </TouchableOpacity>
    <AnimateMany
      right
      // bottom
      // zoom
      // spring
      fade
      duration={1800}
      containerStyle={
        {
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          // padding: 10,
        }
      }>
      <View style={styles.listGridContainer}>
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
          }}>
          <TouchableOpacity style={{}} onPress={handleLisView}>
            <Text>{btnText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Icon name="cart" size={30} color={'#C65D7B'} />
            <View
              style={{
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F55353',
                height: 20,
                width: 20,
                position: 'absolute',
                left: 20,
              }}>
              <Text style={{color: '#fff'}}>{counter}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.header}
          onPress={() =>
            navigation.navigate('AddToFav', {
              favoriteList: favoriteList.length > 0 ? favoriteList : [],
            })
          }>
          <Text style={styles.text}>Go to favorites</Text>
        </TouchableOpacity>
      </View>

      {productData.length == 0 ? (
        <ActivityIndicator size="large" color="#00ff00" style={{top: 300}} />
      ) : (
        <>
          <FlatList
            key={gridColumn ? 'one column' : 'two column'}
            data={productData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={listEmptyComponent}
            onEndReached={handlePaggination}
            numColumns={gridColumn ? 1 : 2}
            ListFooterComponent={renderFooter}
            // ListHeaderComponent={renderHeader}
            // columnWrapperStyle={{flex: 1, justifyContent: 'space-evenly'}}
          />
        </>
      )}
    </AnimateMany>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: '#fff',
    padding: 10,
    // marginVertical: 5,
    // marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  productImgContainer: {height: 180},
  productImage: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    zIndex: 1000,
  },
  informationContainer: {flexDirection: 'row', marginTop: 10},

  ratingStyleContainer: {
    borderRadius: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingStyle: {
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
  },

  noDataFoundText: {fontSize: 28, textAlign: 'center'},
  listGridContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    right: 10,
    justifyContent: 'space-between',
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 10,
  },
  header: {
    borderWidth: 2,
    borderColor: '#C65D7B',
    alignItems: 'center',
    width: '30%',
    justifyContent: 'center',
    height: 30,
    marginLeft: 30,
    borderRadius: 10,
  },
});
