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
import {productList} from '../redux/action/product.action';
import {
  loadingSelector,
  productListSelector,
} from '../redux/selectors/product.selector';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productData = useSelector(productListSelector, shallowEqual);
  const loader = useSelector(loadingSelector, shallowEqual);

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // apiData();
    dispatch(productList(limit));
  }, [limit]);

  const listEmptyComponent = () => {
    return (
      <View style={styles.noDataFound}>
        <Text style={{fontSize: 28, textAlign: 'center'}}>
          No Data Found..! {'\n'}Plz press on Fetch Button
        </Text>
      </View>
    );
  };

  const Item = item => {
    const {title, price, description, category, image, rating, count} = item;
    return (
      <View style={styles.itemStyle}>
        {/* <View style={{flex: 1}}> */}
        <View style={{flex: 1, width: 120, height: 100}}>
          <Image
            style={styles.restroImage}
            source={{
              uri:
                image ||
                'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
            }}
          />
        </View>

        {/* <View style={styles.cityStyle}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
            }}>
            {category}
          </Text>
        </View> */}
        {/* </View> */}

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, color: '#000'}}>{title}</Text>
            <Text style={{fontSize: 18}}>Rs:{price}</Text>
          </View>
          <View
            style={{
              borderRadius: 10,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
            {/* <Text>{count}</Text> */}
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 13, marginTop: 1, alignSelf: 'flex-start'}}>
            {price}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 1,
              borderRadius: 5,
            }}>
            {'votes: '}
            {description}
          </Text>
        </View> */}
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <Item
        title={item.title}
        price={item.price}
        image={item.image}
        category={item.category}
        rating={item.rating.rate}
        count={item.rating.count}
      />
    );
  };

  const apiData = async () => {
    await fetch('https://fakestoreapi.com/products?limit=10')
      .then(response => response.json())
      .then(res => setData(res));
    console.log(data);
  };

  const handlePaggination = () => {
    if (productData.lenght !== limit) {
      setLimit(limit + 10);
    }
  };

  return (
    <SafeAreaView>
      {!loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={productData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          ListEmptyComponent={listEmptyComponent}
          onEndReached={handlePaggination}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-evenly',
            margin: 5,
            padding: 10,
            marginBottom: -10,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 24,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
    height: '100%',
    marginTop: 20,
  },
  restroImage: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  heartStyle: {
    margin: 5,
    position: 'absolute',
    top: -10,
    right: 20,
    width: 25,
    height: 25,
    zIndex: 2,
  },
  heartImgStyle: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  ratingStyle: {
    // color: rating > 3 ? 'green' : 'orange',
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    // borderColor: rating > 3 ? 'green' : 'orange',
  },
  cityStyle: {
    backgroundColor: '#238e31',
    width: 350,
    height: 40,
    margin: 5,
    position: 'absolute',
    top: -25,
    left: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    zIndex: 1,
    opacity: 0.8,
  },
  timerStyle: {
    margin: 5,
    position: 'absolute',
    top: 130,
    right: 10,
    width: '45%',
    height: 25,
    backgroundColor: '#eee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  backBtnStyle: {
    left: 20,
    backgroundColor: '#ccc',
    width: 40,
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  nextBtnStyle: {
    margin: 5,
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: 'lightgreen',
    width: 70,
    height: 70,
    borderRadius: 40,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.8,
  },
});
