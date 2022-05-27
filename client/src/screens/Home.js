import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView, { MarkerAnimated, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import MyMarker from '../components/MyMarker';
import MarkerCallout from '../components/MarkerCallout';
import API from '../shared/API';

const { height, width } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 35.806496916303786;
const LONGITUDE = 10.577301290936692;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = ({ navigation }) => {
  const [selectedDeliveryAgentId, setselectedDeliveryAgentId] = useState(null);
  const [markerCalloutIsVisible, setMarkerCalloutIsVisible] = useState(false);

  const handleMarkerPress = (deliveryAgentId) => () => {
    setselectedDeliveryAgentId(deliveryAgentId);
    setMarkerCalloutIsVisible(true);
    console.log(selectedDeliveryAgentId);
  };

  const [location, setLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [deliveryAgents, setDeliveryAgents] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    if (socket === null) setSocket(io(API));
    if (socket !== null) {
      socket.emit('JOIN_CITY', 'sousse');
      socket.on('RECEIVE_LOCATION', (data) => {
        setDeliveryAgents(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        distanceInterval: 5000,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    })();
  }, []);

  if (!location) return <Text>loading map ...</Text>;

  return (
    <>
      <MapView ref={mapRef} loadingEnabled initialRegion={location} style={styles.map}>
        {deliveryAgents &&
          deliveryAgents.map((el, i) => {
            return (
              <MyMarker onPress={handleMarkerPress(el.id)} title={el.id} key={i} position={el.position} />
            );
          })}
        <MyMarker
          onPress={handleMarkerPress('62874b7e3d84eb21f4fe0fe0')}
          title={'id'}
          position={{ latitude: 35.82121677240191, longitude: 10.605848352850233 }}
        />
      </MapView>

      <MarkerCallout
        setIsVisible={setMarkerCalloutIsVisible}
        isVisible={markerCalloutIsVisible}
        navigation={navigation}
        deliveryAgentId={selectedDeliveryAgentId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: { height: height, width: width },
});

export default Home;
