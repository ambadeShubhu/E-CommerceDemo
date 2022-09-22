import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import ImageZoom from 'react-native-image-pan-zoom';

const ZoomModal = ({
  isVisible,
  backdropColor,
  backdropOpacity,
  onSwipeComplete,
  onBackdropPress,
  toggleModal,
  data,
}) => (
  <Modal
    isVisible={isVisible}
    backdropColor={backdropColor}
    backdropOpacity={backdropOpacity}
    // entry="bottom"
    onSwipeComplete={onSwipeComplete}
    style={styles.modalStyle}
    onBackdropPress={onBackdropPress}>
    <View style={styles.modalBlock}>
      <View style={[styles.itemStyle]}>
        <View style={styles.productImgContainer}>
          <ImageZoom
            style={{bottom: 10}}
            cropWidth={300}
            cropHeight={500}
            imageWidth={200}
            imageHeight={200}>
            <Image
              style={styles.productImage}
              source={{
                uri:
                  data.image ||
                  'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
              }}
            />
          </ImageZoom>
          {/* <Image
            style={styles.productImage}
            source={{
              uri:
                data.image ||
                'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
            }}
          /> */}
        </View>
      </View>

      <View style={styles.middleContainer}>
        <TouchableOpacity style={styles.noBtn} onPress={toggleModal}>
          <Text style={styles.noBtnStyle}>close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export {ZoomModal};

const styles = StyleSheet.create({
  modalStyle: {
    // justifyContent: 'flex-end',
    marginTop: 50,
    marginBottom: 100,
    alignItems: 'center',
  },
  itemStyle: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    // borderWidth: 1,
    // marginVertical: 5,
    // marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  productImgContainer: {width: 300, height: 150},
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
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
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 30,
  },
  middleContainer: {
    // borderWidth: 1,
    flex: 0.2,
    width: '100%',
  },
});
