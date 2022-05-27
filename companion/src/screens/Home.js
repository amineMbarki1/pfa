import { StyleSheet, Dimensions, Image, View, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import MapView, { MarkerAnimated, AnimatedRegion } from 'react-native-maps';
import io from 'socket.io-client';
import { useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { AuthContext } from '../shared/context/AuthContext';
import API from '../shared/API';
import carImg from '../../assets/car.jpg';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LOCATION_TASK_NAME = 'fetch-location-task';

//IP FOR TESTING ON PHONE :http://192.168.1.67
//IP FOR TESTING ON EMULATOR : http://10.0.2.2

const Home = () => {
  const { user } = useContext(AuthContext);

  const [active, setActive] = useState(true);

  const activateDisableTracking = () => setActive((prev) => !prev);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [socket, setSocket] = useState(null);

  const [position, setPosition] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });

  const [coordinate, _] = useState(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  );

  const watchLocation = async () => {
    await Location.watchPositionAsync({ accuracy: Location.Accuracy.BestForNavigation }, (location) => {
      const { coords } = location;
      const newPosition = { latitude: coords.latitude, longitude: coords.longitude };

      coordinate
        .timing({ ...newPosition, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA })
        .start();

      mapRef?.current?.animateToRegion({
        ...newPosition,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      setPosition(newPosition);
    });
  };

  useEffect(() => {
    if (socket !== null)
      if (active) socket.emit('SEND_LOCATION', { position, deliveryAgentId: user._id, city: 'sousse' });
  }, [position, active]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location access denied');
        return;
      }
      watchLocation();
    })();
  }, []);

  useEffect(() => {
    if (socket === null) setSocket(io(API, { transports: ['websocket'] }));
    if (socket) {
      socket.emit('JOIN_DELIVERY_REQUEST', user._id);
      socket.on('RECEIVE_DELIVERY_REQUEST', () => {
        Toast.show({ type: 'info', text1: 'New Delivery Request' });
        console.log('delivery');
      });
    }
  }, [socket]);

  return (
    <>
      <TouchableOpacity
        onPress={activateDisableTracking}
        style={[styles.offButton, { backgroundColor: active ? 'blue' : 'red' }]}
      >
        <FontAwesome name="power-off" size={24} color="white" />
      </TouchableOpacity>
      <MapView
        style={styles.map}
        showUserLocation
        followUserLocation
        loadingEnabled
        // region={getMapRegion()}
        ref={mapRef}
      >
        <MarkerAnimated coordinate={coordinate} ref={markerRef}>
          <Image style={{ height: 60, width: 44, resizeMode: 'contain' }} source={carImg} />
        </MarkerAnimated>
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: { height, width, flex: 1 },
  offButton: {
    position: 'absolute',
    top: 50,
    right: 50,
    zIndex: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default Home;
