import { MarkerAnimated, AnimatedRegion } from 'react-native-maps';
import { useRef, useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

import carImg from '../../assets/car.png';
const { height, width } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

const MyMarker = ({ position, ...props }) => {
  const markerRef = useRef(null);
  const [coordinate, _] = useState(
    new AnimatedRegion({
      ...position,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    })
  );
  useEffect(() => {
    coordinate
      .timing({ ...position, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA })
      .start();
  }, [position]);

  return (
    <MarkerAnimated ref={markerRef} coordinate={coordinate} {...props}>
      <Image style={{ height: 35, width: 35, resizeMode: 'cover' }} source={carImg} />
    </MarkerAnimated>
  );
};

export default MyMarker;
