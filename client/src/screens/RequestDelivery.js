import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useRef } from 'react';

import PackageSize from '../components/PackageSize';
import DeliveryType from '../components/DeliveryType';
import PackageDescription from '../components/PackageDescription';
import DeliveryAddress from '../components/DeliveryAddress';
import PickupAddress from '../components/PickupAddress';

const RequestDelivery = ({ route }) => {
  console.log(route.params);
  const { deliveryAgentId } = route.params;
  const swiperRef = useRef(null);
  const next = () => {
    swiperRef.current.scrollToIndex({ index: swiperRef.current.getCurrentIndex() + 1 });
  };

  return (
    <SwiperFlatList ref={swiperRef}>
      <PackageSize next={next} />
      <DeliveryType next={next} />
      <PickupAddress next={next} />
      <DeliveryAddress deliveryAgentId={deliveryAgentId} next={next} />
      <PackageDescription />
    </SwiperFlatList>
  );
};

export default RequestDelivery;
