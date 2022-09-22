import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserPro = ({navigation}) => {
  // const test = ['test', 'test1', 'test2', 'test3', 'test4', 'test5'];

  const newData = [
    {
      data: [
        {id: 1, name: 'ashvin', job: 'vice Captian', qty: 9},
        {id: 2, name: 'vin', job: 'driver', qty: 1},
        {id: 3, name: 'aaaron', job: 'postman', qty: 6},
        {id: 4, name: 'robbot', job: 'batter', qty: 3},
        {id: 5, name: 'boy', job: 'bowler', qty: 4},
        {id: 6, name: 'toy', job: 'keeper', qty: 2},
      ],
    },
  ];

  let newItem = newData.map(item => {
    // console.log('0000--->', newData.indexOf(item.data));
    let index = item.data.findIndex(x => x.name === 'boy');
    console.log(index);
  });

  console.log('indexData-->', newItem);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text>Shubhu Ambade</Text>
          <Text style={styles.info}>React Native / Mobile developer</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
            electram expetendis, omittam deseruisse consequuntur ius an,
          </Text>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              try {
                await AsyncStorage.clear();
              } catch (e) {
                console.log(e);
              }

              navigation.replace('Login');
            }}
            style={styles.buttonContainer}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserPro;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: '#fff',
    // marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    // flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
