import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import people from '../../assets/people.png';
import pick from '../../assets/pick.png';
import dest from '../../assets/dest.png';
import Map from '../components/Map';

import {useRoute, useNavigation} from '@react-navigation/native';
const Offer = () => {
  const route = useRoute();
  console.log('offer routes....>>> ' + route.params);
  const navigation = useNavigation();
  const {myorigin, mydestination, amount} = route.params;
  const [cfare, setCfare] = useState(Number(amount));

  const handleIncrease = () => {
    setCfare(Number(parseInt(cfare + 5)));
  };
  const handleDecrease = () => {
    setCfare(cfare - 5);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.offWrp}>
        <Map myorigin={myorigin} mydestination={mydestination} />
        <Pressable
          style={{position: 'absolute', top: 0}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.cncl}>Cancel</Text>
        </Pressable>

        {/* <View style={styles.croff}>
          <View style={styles.lcont}>
            <Image source={people} style={styles.drimg} />
            <Text style={styles.dname}>Name</Text>
            <Text style={styles.drat}>4.8*</Text>
          </View>
          <View style={styles.mcont}>
            <Text style={styles.far}>$8</Text>
            <Text style={styles.dcar}>Car</Text>
            <Text style={styles.time}>5min</Text>
            <Text style={styles.dstn}>2km</Text>
          </View>
          <View style={styles.rcont}>
            <Pressable>
              <Text style={styles.accBtn}>Accept</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.decBtn}>Decline</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.croff2}>
          <View style={styles.lcont}>
            <Image source={people} style={styles.drimg} />
            <Text style={styles.dname}>Name</Text>
            <Text style={styles.drat}>4.8*</Text>
          </View>
          <View style={styles.mcont}>
            <Text style={styles.far}>$8</Text>
            <Text style={styles.dcar}>Car</Text>
            <Text style={styles.time}>5min</Text>
            <Text style={styles.dstn}>2km</Text>
          </View>
          <View style={styles.rcont}>
            <Pressable>
              <Text style={styles.accBtn}>Accept</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.decBtn}>Decline</Text>
            </Pressable>
          </View>
        </View> */}
      </SafeAreaView>
      <SafeAreaView style={styles.locWrp}>
        <View style={styles.pcup}>
          <Image source={pick} style={styles.img} />
          <Text style={styles.cinput}>San Francisco</Text>
          {/* <TextInput
            style={styles.cinput}
            onChangeText={onChangeText}
            value={text}
            placeholderTextColor={'white'}
            placeholder="San Francisco"
          /> */}
        </View>
        <View style={styles.pcup}>
          <Image source={dest} style={styles.img} />
          <Text style={styles.cinput}>California</Text>
        </View>
        <Text style={styles.lfar}>$ {cfare}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.farWrp}>
        <Text style={styles.crfar}>Current Fare</Text>
        <View style={styles.btnWrp}>
          <TouchableOpacity onPress={handleDecrease}>
            <Text style={styles.decbTn}>- 5</Text>
          </TouchableOpacity>
          <Text style={styles.lfar}>$ {cfare}</Text>
          <TouchableOpacity onPress={handleIncrease}>
            <Text style={styles.incbTn}>+ 5</Text>
          </TouchableOpacity>
        </View>
        <Pressable>
          <Text style={styles.rasBtn}>Raise Fare</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offWrp: {
    flex: 3,
    position: 'relative',
  },
  farWrp: {
    flex: 1,
    height: hp('25%'),
    backgroundColor: '#090A0C',
    paddingVertical: hp('2%'),
  },
  rasBtn: {
    backgroundColor: '#ABD032',
    textAlign: 'center',
    fontSize: hp('2%'),
    fontWeight: '500',
    width: wp('90%'),
    alignSelf: 'center',
    color: 'black',
    borderRadius: 8,
    paddingVertical: hp('1%'),
    // paddingHorizontal: 12,
    marginVertical: hp('.5%'),
  },
  crfar: {
    // flex: 1,
    textAlign: 'center',
    fontSize: hp('2%'),
    color: 'white',
  },
  img: {
    height: hp('5%'),
    width: wp('5%'),
    resizeMode: 'cover',
  },
  btnWrp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pcup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 16,
  },
  a: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    backgroundColor: 'skyblue',
    borderRadius: 100,
    padding: 2,
    height: 25,
    width: 25,
    textAlign: 'center',
    alignContent: 'center',
  },

  b: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    backgroundColor: 'lightgreen',
    borderRadius: 100,
    padding: 2,
    height: 25,
    width: 25,
    textAlign: 'center',
    alignContent: 'center',
  },
  incbTn: {
    backgroundColor: '#ABD032',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'black',
  },
  decbTn: {
    backgroundColor: '#16191E',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    fontSize: hp('2%'),

    fontWeight: 'bold',
    color: 'white',
  },
  cncl: {
    backgroundColor: '#212121',
    paddingVertical: 11,
    textAlign: 'center',
    fontSize: hp('2.5%'),

    fontWeight: 'bold',
    color: '#AED431',
    width: wp('100%'),
  },
  croff: {
    position: 'absolute',
    top: 60,
    backgroundColor: '#1f2120',
    height: hp('15%'),
    width: wp('94%'),
    alignSelf: 'center',
    marginVertical: 4,
    borderRadius: 11,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 14,
  },
  croff2: {
    position: 'absolute',
    top: 200,
    backgroundColor: '#1f2120',
    height: hp('15%'),
    width: wp('94%'),
    alignSelf: 'center',
    marginVertical: 4,
    borderRadius: 11,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 14,
  },
  drimg: {
    height: hp('6%'),
    width: wp('12%'),
    resizeMode: 'cover',
    padding: 11,
    backgroundColor: '#494949',
    borderRadius: 100,
  },
  accBtn: {
    backgroundColor: '#ABD032',
    paddingVertical: 7,
    paddingHorizontal: 16,
    color: 'black',
    borderRadius: 8,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  decBtn: {
    backgroundColor: '#494949',
    paddingVertical: 7,
    paddingHorizontal: 16,
    color: 'tomato',
    borderRadius: 8,
    fontSize: hp('2%'),

    fontWeight: 'bold',
  },

  rcont: {
    display: 'flex',
    flexDirection: 'column',
    gap: hp('2%'),
  },
  mcont: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  lcont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  dname: {
    color: 'white',
    fontSize: hp('1.8%'),

    fontWeight: '500',
  },
  drat: {
    color: 'white',
    fontSize: hp('1.6%'),

    fontWeight: '500',
  },
  dcar: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '500',
  },
  far: {
    color: '#ABD032',
    fontSize: hp('2%'),
    fontWeight: '500',
  },
  time: {
    color: 'white',
    fontSize: hp('1.8%'),

    fontWeight: '500',
  },
  dstn: {
    color: 'white',
    fontSize: hp('1.8%'),

    fontWeight: '500',
  },
  map: {
    // flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locWrp: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#101115',
    // backgroundColor: '#494949',
    alignContents: 'center',
    paddingVertical: 7,
    // borderTopRightRadius: 8,
    // borderTopLeftRadius: 8,
  },
  cinput: {
    height: 44,
    fontSize: hp('1.8%'),
    color: 'white',
    padding: 11,
  },
  lfar: {
    height: 44,
    fontSize: hp('2%'),
    paddingHorizontal: 55,
    paddingVertical: 6,
    color: '#ABD032',
  },
});

export default Offer;
