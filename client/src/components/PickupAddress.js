import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import Button from './Button';

const reverseGeocode = async ({ latitude, longitude }) => {
  const apiKey = 'de6c620c6802e37e90ad9f998846ad2e3b200de1';
  try {
    const { data } = await axios(
      `https://api.geocodify.com/v2/reverse?api_key=${apiKey}&lat=${latitude}&lng=${longitude}`
    );

    return data.response.features[0].properties;
  } catch (error) {
    console.log('Error Reverse Geocoding Lat and long');
  }
  return response;
};

const PickupAddress = ({ next }) => {
  const [pickupAddress, setPickupAddress] = useState(null);
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);

  const showCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    setPosition({ longitude: coords.longitude, latitude: coords.latitude });
  };

  const handleMapPress = async (e) => {
    const { coordinate } = e.nativeEvent;
    setPickupAddress(coordinate);

    const locationData = await reverseGeocode(coordinate);
    console.log(locationData);

    const { street, country, region, label } = locationData;

    setAddress(`${street || label} ${region}, ${country}`);
  };

  useEffect(() => {
    showCurrentLocation();
  }, []);

  return (
    <View>
      <Text style={styles.title}>Please Select Pickup Address</Text>
      <MapView
        onPress={handleMapPress}
        showsMyLocationButton
        loadingEnabled
        showsUserLocation
        style={styles.map}
      >
        {pickupAddress && <Marker coordinate={pickupAddress} />}
      </MapView>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 50 }}>
          <Ionicons name="location-outline" size={60} color="black" />
          <View>
            {address && <Text>{address}</Text>}
            <Text>{`${pickupAddress?.latitude}, ${pickupAddress?.longitude}`}</Text>
          </View>
        </View>

        <Button onPress={next}>Next</Button>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { width, height },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20, paddingHorizontal: 20 },
  map: { width, height: '50%' },
});

export default PickupAddress;
