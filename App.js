import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Bid from './src/screens/Bid';
import Offer from './src/screens/Offer';
import ForgottPswd from './src/screens/ForgottPswd';
import NoInternet from './src/components/NoInternet';

import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
      if (state.isConnected === false) {
        Alert.alert(
          'No Internet!',
          'Please checkout your connection and try ot reconnect!',
          [
            {
              text: 'Reload App',
              onPress: () => {
                RNRestart.Restart();
              },
            },
          ],
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: 'white',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Bid" component={Bid} />
        <Stack.Screen name="Offer" component={Offer} />
        <Stack.Screen name="ForgottPswd" component={ForgottPswd} />
        <Stack.Screen name="NoInternet" component={NoInternet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
