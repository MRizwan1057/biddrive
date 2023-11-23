import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ForgottPswd = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const handePress = () => {
    navigation.navigate('Register');
  };
  return (
    <SafeAreaView>
      <SafeAreaView style={styles.upWrp}>
        <View style={styles.logoWrp}>
          <Image
            style={styles.logo}
            source={require('../../assets/logobd.png')}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.contWrp}>
        <View>
          <Text style={styles.titText}>Forgott Password ?</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          onChangeText={onChangeText}
          value={text}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Email"
        />
        {/* <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          onChangeText={onChangeNumber}
          value={text}
          placeholder="Password"
        /> */}

        <View style={styles.auth}>
          <Pressable
            style={styles.loginPress}
            onPress={() => {
              navigation.navigate('Bid');
            }}>
            <Text style={styles.hdText}>Reset Password</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  upWrp: {
    width: wp('100%'),
    height: hp('25%'),
    backgroundColor: '#323a3d',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoWrp: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 20,
    marginBottom: -60,
    elevation: 22,
  },
  logo: {
    // backgroundColor: '#79846D',
    borderRadius: 100,
    height: hp('12%'),
    width: wp('25%'),
    // marginBottom: -60,
    // padding: 33,
    resizeMode: 'contain',
  },
  contWrp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titText: {
    paddingTop: 100,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: wp('88%'),
    height: hp('5%'),
    margin: 10,
    // borderWidth: 1,
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  auth: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPress: {
    backgroundColor: '#9dc93b',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    cursor: 'pointer',
    marginVertical: 15,
  },
  hdText: {
    fontSize: hp('2%'),
    fontWeight: '500',
    color: 'black',
  },
  linkText: {
    fontSize: hp('1.2%'),
    fontWeight: '500',
    color: 'black',
  },
});

export default ForgottPswd;
