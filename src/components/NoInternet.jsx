import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
const NoInternet = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
      if (state.isConnected === false) {
        Alert.alert('No Internet!', 'Please reconnect!', [
          {
            text: 'Reload',
            onPress: () => {
              RNRestart.Restart();
            },
          },
        ]);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 50,
          width: '100%',
          backgroundColor: isConnected ? 'lightgreen' : 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontWeight: '500'}}>
          {isConnected ? 'Back Online' : 'No Internet Connection'}
        </Text>
      </View>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({});
