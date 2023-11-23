import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SelectDropdown from 'react-native-select-dropdown';

const countries = ['California', 'Florida', 'Michigan', 'New York', 'Texas'];
const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const handePress = () => {
    navigation.navigate('Bid');
  };
  return (
    <View enabled style={styles.container}>
      <SafeAreaView style={styles.uppWRp}>
        <View>
          <Text style={styles.titText}>Register</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.contWrp}>
        <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={text => {
            setName(text);
          }}
          value={name}
          placeholder="Full Name"
        />
        <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={text => {
            setContact(text);
          }}
          value={contact}
          placeholder="Contact"
          keyboardType="number-pad"
        />
        {/* <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={text => {
            setCountry(text);
          }}
          value={country}
          placeholder="Country"
        /> */}
        <SelectDropdown
          dropdownStyle={styles.dinput}
          data={countries}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
          }}
          defaultButtonText={'states'}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          buttonStyle={styles.input}
          buttonTextStyle={styles.btnText}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        {/* <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={text => {
            setCity(text);
          }}
          value={city}
          placeholder="City"
        /> */}

        <View style={styles.auth}>
          <Pressable style={styles.loginPress} onPress={handePress}>
            <Text style={styles.hdText}>Register</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.linkText}>Login</Text>
          </Pressable>
        </View>
        <View style={styles.logoWrp}>
          <Image
            style={styles.logo}
            source={require('../../assets/logobd.png')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uppWRp: {
    flex: 1,
    backgroundColor: '#323a3d',
  },
  logoWrp: {
    marginVertical: 30,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 20,
    elevation: 12,
  },
  logo: {
    borderRadius: 100,
    height: hp('8%'),
    width: wp('16%'),
    resizeMode: 'contain',
  },
  contWrp: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titText: {
    paddingTop: 50,
    fontSize: hp('3%'),
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  input: {
    width: wp('88%'),
    height: hp('5.5%'),
    margin: 10,
    // borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    elevation: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  auth: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor: '#9dc93b',
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
    fontWeight: 'bold',
    color: 'black',
  },
  linkText: {
    fontSize: hp('2%'),

    fontWeight: 'bold',
    color: 'black',
    borderWidth: 2,
    borderColor: '#9dc93b',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  dinput: {
    backgroundColor: 'lightgreen',
    paddingHorizontal: 11,
    borderRadius: 11,
    textAlign: 'left',
    // textAlign: 'center',
    // alignSelf: 'center',
  },
  btnText: {
    textAlign: 'left',
    color: 'black',
    fontSize: 15,
    // height: 50,
    // paddingVertical: 8,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Register;
