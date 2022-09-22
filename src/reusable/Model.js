import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {ZoomModal} from './ZoomModal';
import StarRating from 'react-native-star-rating';

const ToggleModal = ({
  isVisible,
  backdropColor,
  backdropOpacity,
  onSwipeComplete,
  onBackdropPress,
  toggleModal,
  addToCart,
  data,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  const openModal = () => {
    setModalVisible(!isModalVisible);
  };

  const modalOpen = data => {
    // console.log('model data-->', item);
    setModalData(data);
    openModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      // entry="bottom"
      onSwipeComplete={onSwipeComplete}
      style={styles.modalStyle}
      onBackdropPress={onBackdropPress}>
      <View style={styles.modalBlock}>
        {/* <View style={styles.swipeDownIcon} />
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <Text style={{fontSize: 22}}>Product Details</Text>
    </View> */}

        <View style={[styles.itemStyle]}>
          <View style={styles.productImgContainer}>
            <TouchableOpacity onPress={() => modalOpen(data)}>
              <Image
                style={styles.productImage}
                source={{
                  uri:
                    data.image ||
                    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.informationContainer}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18}}>{data.category}</Text>
              <Text style={{fontSize: 14, marginTop: 4, fontWeight: 'bold'}}>
                {data.title}
              </Text>
              <ScrollView
                style={{
                  backgroundColor: '#eee',
                  height: '40%',
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 18, marginTop: 4, textAlign: 'center'}}>
                  {data.description}
                </Text>
              </ScrollView>
              <Text style={{fontSize: 16, marginTop: 4, fontWeight: 'bold'}}>
                ${data.price}
              </Text>
              {/* <View style={styles.ratingStyleContainer}>
                <Text
                  style={[
                    styles.ratingStyle,
                    {
                      color: data.rating > 3 ? 'green' : 'orange',
                      borderColor: data.rating > 3 ? 'green' : 'orange',
                    },
                  ]}>
                  {data.rating}
                </Text>
              </View> */}
              <StarRating
                containerStyle={{width: 50}}
                starStyle={{width: 30, height: 20}}
                starSize={20}
                disabled={false}
                maxStars={5}
                rating={data.rating}
                fullStarColor={data.rating > 3 ? 'green' : 'orange'}
              />
            </View>
          </View>
        </View>

        <View style={styles.middleContainer}>
          <TouchableOpacity style={[styles.noBtn]} onPress={addToCart}>
            <Text style={styles.noBtnStyle}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noBtn} onPress={toggleModal}>
            <Text style={styles.noBtnStyle}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ZoomModal
        isVisible={isModalVisible}
        backdropColor={'#eee'}
        backdropOpacity={0.7}
        toggleModal={toggleModal}
        onBackdropPress={() => toggleModal()}
        data={modalData}
      />
    </Modal>
  );
};

export {ToggleModal};

const styles = StyleSheet.create({
  modalStyle: {
    // justifyContent: 'flex-end',
    marginTop: 50,
    marginBottom: 100,
    alignItems: 'center',
  },
  itemStyle: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    // marginVertical: 5,
    // marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 10,
    shadowRadius: 1,

    marginTop: 10,
  },
  productImgContainer: {width: 300, height: 150},
  productImage: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  ratingStyleContainer: {
    borderWidth: 1,
    borderRadius: 10,
    // width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingStyle: {
    fontWeight: 'bold',
    // borderWidth: 1,
    padding: 2,
    borderRadius: 5,
  },

  informationContainer: {flexDirection: 'row', marginTop: 10},

  /////////////

  modalBlock: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    paddingVertical: 10,
    height: '80%',
    width: '100%',
    paddingLeft: 17,
    paddingRight: 17,
  },
  swipeDownIcon: {
    width: '10%',
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 20,
  },

  noBtn: {
    backgroundColor: 'pink',
    // width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    // top: 30,

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 10,
    shadowRadius: 1,
  },
  middleContainer: {
    // borderWidth: 1,
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
  },
});
