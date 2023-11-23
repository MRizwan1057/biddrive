import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

import pick from '../../assets/pick.png';
import dest from '../../assets/dest.png';

import Location from '../components/Location';
import MapView, {Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapViewDirections from 'react-native-maps-directions';
const API_KEY = 'AIzaSyBinbWKQlWqEjZBhF07QXLUZYgd4m5MufU';
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
        visibility: 'on',
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
// import {useRoute} from '@react-navigation/native';
const Map = props => {
  const {myorigin, mydestination} = props;

  console.log('map myorigin ==>>>', myorigin);
  console.log('map mydestination ==>>>', mydestination);
  // const route = useRoute();

  const [state, setState] = useState({
    origin: {
      latitude: 37.7749,
      longitude: 122.4194,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    destination: {
      latitude: 34.0549,
      longitude: 118.2426,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  // useEffect(() => {
  //   setState({
  //     ...state,
  //     myorigin,
  //     mydestination,
  //   });
  // }, []);
  const {origin, destination} = state;

  const mapRef = useRef();
  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        customMapStyle={mapDarkStyle}
        style={StyleSheet.absoluteFill}
        initialRegion={origin}>
        <Marker coordinate={myorigin} />

        <Marker coordinate={mydestination} />

        <MapViewDirections
          origin={myorigin}
          destination={mydestination}
          apikey={API_KEY}
          strokeWidth={3}
          strokeColor="lightgreen"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 20,
                bottom: 20,
                left: 20,
                top: 150,
              },
              animated: true,
            });
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapWrp: {
    position: 'relative',
    flex: 2,
  },

  abslt: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
});

export default Map;
