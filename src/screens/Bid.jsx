import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import c1 from '../../assets/01.png';
import c2 from '../../assets/02.png';
import c3 from '../../assets/03.png';
import c4 from '../../assets/04.png';
import i5 from '../../assets/rat.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Map from '../components/Map';
import Location from '../components/Location';
import {useRoute, useNavigation} from '@react-navigation/native';

const Bid = ({myorigin, mydestination}) => {
  console.log('bid org and dest', myorigin, mydestination);
  const [amount, setAmount] = useState();
  const route = useRoute();

  const navigation = useNavigation();
  const DATA = [
    {
      bimg: c1,
      bcar: 'suv car',
      bprc: '$4/5km',
      selected: false,
      brat: i5,
    },
    {
      bimg: c2,
      bcar: 'seden car',
      bprc: '$5/5km',
      selected: false,
      brat: i5,
    },
    {
      bimg: c3,
      bcar: 'suv car',
      bprc: '$6/5km',
      selected: false,
      brat: i5,
    },
    {
      bimg: c4,
      bcar: 'seden car',
      bprc: '$7/5km',
      selected: false,
      brat: i5,
    },
    {
      bimg: c1,
      bcar: 'suv car',
      bprc: '$8/5km',
      selected: false,
      brat: i5,
    },
    {
      bimg: c2,
      bcar: 'seden car',
      bprc: '$9/5km',
      selected: false,
      brat: i5,
    },
  ];
  // FlatList Selection of item
  const [select, setSelect] = useState(DATA);

  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPanimated, setIsPanimated] = useState(false);
  const [isDanimated, setIsDanimated] = useState(false);
  const [result, setRresult] = useState({
    presult: '',
    dresult: '',
  });
  const [cords, setCords] = useState({
    origin: {
      latitude: 13.0826802,
      longitude: 80.2707184,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    destination: {
      latitude: 26.9124336,
      longitude: 75.7872709,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  // console.warn(cords);
  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechError = err => setError(err);

    Voice.onSpeechResults = e => {
      setRresult({...result, presult: e.value[0], dresult: e.value[0]});
    };
    // Voice.onSpeechResults = result => setDresult(result.value);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (err) {
      setError(err);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      setError(err);
    }
  };

  const handleDestination = (data, details) => {
    dlat = details.geometry.location.lat;
    dlng = details.geometry.location.lng;
    // console.l og(data, details);
    // console.log(dlat, dlng);
    setCords({
      ...cords,
      destination: {
        latitude: dlat,
        longitude: dlng,
      },
    });
  };
  const handlePickup = (data, details) => {
    plat = details.geometry.location.lat;
    plng = details.geometry.location.lng;
    // console.l og(data, details);
    // console.log(dlat, dlng);
    setCords({
      ...cords,
      origin: {
        latitude: plat,
        longitude: plng,
      },
    });
  };
  const {origin, destination} = cords;
  // console.log('Selected====>>>', select[0].selected);
  const handleSelect = ind => {
    const newItem = select.map((item, index) => {
      if (index === ind) {
        return {...item, selected: !item.selected};
      } else {
        return {...item, selected: false};
      }
    });
    setSelect(newItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.mapWrp}>
        {/* <Map myorigin={myorigin} mydestination={mydestination} /> */}
        {/* <Location myorigin={myorigin} mydestination={mydestination} /> */}
        {/* Location */}
        <SafeAreaView style={styles.abslt}>
          <View style={styles.whWrp}>
            <Text style={styles.titText}>Where To?</Text>
            <View style={styles.inpWrp}>
              <GooglePlacesAutocomplete
                placeholder={'Pickup location'}
                textInputProps={{
                  placeholderTextColor: '#9dc93b',
                  // returnKeyType: 'search',
                }}
                onPress={handlePickup}
                query={{
                  key: API_KEY,
                  language: 'en',
                }}
                fetchDetails={true}
                styles={{
                  textInput: styles.input,
                }}
              />
              <Pressable
                onPress={() => {
                  if (isRecording === true) {
                    setIsPanimated(!isPanimated);
                    stopRecording();
                  } else {
                    startRecording();
                  }
                }}>
                {isPanimated ? (
                  <Image source={voicegif} style={[styles.vcimg]} />
                ) : (
                  <Image source={voice} style={[styles.vcimg]} />
                )}
              </Pressable>
            </View>
            <View style={styles.inpWrp}>
              <GooglePlacesAutocomplete
                placeholder={'Destination'}
                textInputProps={{
                  placeholderTextColor: '#9dc93b',
                  returnKeyType: 'search',
                }}
                onPress={handleDestination}
                query={{
                  key: API_KEY,
                  language: 'en',
                }}
                fetchDetails={true}
                styles={{
                  textInput: styles.input,
                }}
              />
              <Pressable
                onPress={() => {
                  if (isRecording === true) {
                    setIsDanimated(!isDanimated);
                    stopRecording();
                  } else {
                    startRecording();
                  }
                }}>
                {isDanimated ? (
                  <Image source={voicegif} style={[styles.vcimg]} />
                ) : (
                  <Image source={voice} style={[styles.vcimg]} />
                )}
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                // console.log(state);
                navigation.navigate('Offer', {
                  myorigin: origin,
                  mydestination: destination,
                });
              }}>
              <Text style={styles.gbtn}>Go</Text>
            </Pressable>
          </View>
        </SafeAreaView>
        {/* Location */}
      </SafeAreaView>

      <SafeAreaView style={styles.bidWrp}>
        <View>
          <Text style={styles.btl}>Drop off</Text>
          <Text style={styles.bdesc}>Universal Airport</Text>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={select}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                handleSelect(index);
              }}
              style={[
                styles.fltWrp,
                {
                  borderColor: item.selected ? 'lightgreen' : '#2b2d2c',
                  borderWidth: item.selected ? 1 : 0,
                },
              ]}>
              <View style={styles.imgCont}>
                <Image style={styles.imgWrp} source={item.bimg} />
              </View>
              <View>
                <Text style={styles.carWrp}>{item.bcar}</Text>
              </View>
              <View>
                <Text style={styles.priceWrp}>{item.bprc}</Text>
              </View>
              <View>
                <Image style={styles.ratWrp} source={item.brat} />
              </View>
            </TouchableOpacity>
          )}
        />
        <SafeAreaView style={styles.amntWrp}>
          <Text style={styles.titText}>Enter Amount</Text>
          <View style={styles.inpWrp}>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#9dc93b'}
              value={amount}
              onChangeText={text => {
                setAmount(text);
              }}
              placeholder="$ 45"
              keyboardType="numeric"
            />
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('Offer', {
                amount,
                myorigin,
                mydestination,
              });
            }}>
            <Text style={styles.drvBtn}>Find a Driver</Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2d2c',
  },
  mapWrp: {
    position: 'relative',
    flex: 2,
  },
  map: {
    width: hp('100%'),
    height: wp('100%'),
    justifyContent: 'center',
  },

  bidWrp: {
    flex: 3,
    backgroundColor: '#1f2120',
    paddingVertical: 20,
    paddingHorizontal: 6,

    // display: 'flex',
    justifyContent: 'center',
    // borderTopRightRadius: 27,
    // borderTopLeftRadius: 27,
  },
  fltWrp: {
    height: hp('22%'),
    width: wp('33%'),
    margin: hp('.6%'),
    borderRadius: 11,
    padding: hp('2%'),
    elevation: 2,
    backgroundColor: '#2b2d2c',
  },

  btl: {
    color: 'white',
    fontSize: hp('2.2%'),
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  bdesc: {
    color: 'white',
    fontSize: hp('1.8%'),
    paddingHorizontal: 10,
    marginTop: 7,
  },
  imgCont: {
    backgroundColor: '#323433',
    padding: 7,
    borderRadius: 8,
  },
  imgWrp: {
    height: hp('6%'),
    width: wp('18%'),
  },
  carWrp: {
    // backgroundColor: 'red',
    padding: 7,
    fontSize: hp('2%'),

    color: 'white',
  },
  priceWrp: {
    // backgroundColor: 'pink',
    padding: 7,
    color: '#8dbe00',
    fontSize: hp('1.9%'),
  },
  ratWrp: {
    padding: 8,
    height: hp('2.3%'),
    width: wp('18%'),
  },
  amntWrp: {
    backgroundColor: '#1f2120',
    width: wp('88%'),
    // height: hp('22%'),
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 11,
    borderRadius: 16,
    padding: 5,
    paddingBottom: 15,
  },
  titText: {
    padding: 7,
    fontSize: hp('2%'),

    color: 'white',
    fontWeight: '500',
  },
  input: {
    // width: '85%',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    fontSize: hp('1.9%'),

    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 11,
  },
  drvBtn: {
    fontSize: hp('2.2%'),

    fontWeight: '500',
    backgroundColor: '#9dc93b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: 'black',
    width: wp('55%'),
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 11,
  },
  inpWrp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 3,
    width: wp('85%'),
  },

  whWrp: {
    backgroundColor: '#1f2120',
    width: '92%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 11,
    borderRadius: 16,
    padding: 10,
    paddingBottom: 15,
  },
  abslt: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
  inputloc: {
    padding: 7,
    color: 'white',
    fontSize: 18,
  },
  titText: {
    padding: 7,
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  input: {
    width: '85%',
    borderRadius: 20,
    padding: 10,
    color: '#9dc93b',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },

  auth: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vcimg: {
    height: hp('6%'),
    width: wp('12%'),
  },
  gbtn: {
    width: wp('33%'),
    backgroundColor: '#9dc93b',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 11,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
  },
});

export default Bid;
