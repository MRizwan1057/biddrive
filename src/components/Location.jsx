import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import voice from '../../assets/voice.png';
import voicegif from '../../assets/voicegif.gif';
const API_KEY = 'AIzaSyBinbWKQlWqEjZBhF07QXLUZYgd4m5MufU';
import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import Voice from '@react-native-voice/voice';

const Location = props => {
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

  const navigation = useNavigation();

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

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
  // locWrp: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: deviceWidth / 1.5,
  //   alignSelf: 'center',
  //   borderColor: '#9dc93b',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   paddingHorizontal: 12,
  //   marginVertical: 12,
  // },

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

export default Location;
