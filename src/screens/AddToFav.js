import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {removeFavItemList} from '../redux/action/favorite.action';
import {favoriteItemSelector} from '../redux/selectors/product.selector';

const AddToFav = () => {
  const favItem = useSelector(favoriteItemSelector, shallowEqual);
  const route = useRoute();
  const dispatch = useDispatch();
  const {favoriteList} = route.params;
  const [favoriteList1, setFavoruiteList1] = useState([]);

  const onRemoveFavorite = removeProducts => {
    dispatch(removeFavItemList(removeProducts));
    const filteredList = favoriteList1.filter(
      item => item.id !== removeProducts.id,
    );
    setFavoruiteList1(filteredList);
    Toast.show({
      type: 'error',
      text1: `${removeProducts.title}`,
      text2: `removed`,
    });
  };

  const Item = item => {
    // console.log('favItem', item);
    const {id, title, price, description, category, image, rating, count} =
      item;

    return (
      <TouchableOpacity
        onLongPress={() => onRemoveFavorite(item)}
        style={[styles.itemStyle]}>
        <View style={styles.productImgContainer}>
          <Image
            style={styles.restroImage}
            source={{
              uri:
                image ||
                'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
            }}
          />
        </View>

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
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <Item
        id={item.favItem.id}
        title={item.favItem.title}
        price={item.favItem.price}
        image={item.favItem.image}
        category={item.favItem.category}
        rating={item.favItem.rating}
      />
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.noDataFound}>
        <Text style={styles.noDataFoundText}>No Data Found..!</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center'}}>Long press to removed item.</Text>
      {favItem && (
        <FlatList
          data={favItem}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={listEmptyComponent}
          style={{flex: 1}}
        />
      )}
    </View>
  );
};

export default AddToFav;

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    // height: '100%',
    marginTop: 20,
  },
  productImgContainer: {width: 350, height: 180},
  restroImage: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  informationContainer: {flexDirection: 'row', marginTop: 10},

  ratingStyleContainer: {
    borderRadius: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingStyle: {
    // color: rating > 3 ? 'green' : 'orange',
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    // borderColor: rating > 3 ? 'green' : 'orange',
  },

  noDataFoundText: {fontSize: 28, textAlign: 'center'},
});
