import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1500);
  }, []);
  return (
    <View style={styles.logoWrp}>
      <Image style={styles.logo} source={require('../../assets/splash.gif')} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrp: {
    backgroundColor: 'white',
    // borderRadius: 100,
    padding: 20,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: hp('100%'),
    width: wp('100%'),
    resizeMode: 'cover',
  },
});

export default Splash;
