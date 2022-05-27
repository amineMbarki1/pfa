import { StyleSheet, TouchableOpacity, ActivityIndicator, Text, Image, View, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import useAxios from '../shared/hooks/useAxios';

import Button from '../components/Button';

const VehiculeIcon = ({ vehicule }) => {
  switch (vehicule) {
    case 'Truck':
      return <FontAwesome5 name="truck" size={24} color="#555" />;
    case 'Car/Van':
      return <FontAwesome5 name="car" size={24} color="#555" />;
    case 'Bike':
      return <FontAwesome5 name="bicycle" size={24} color="#555" />;
    default:
      return <FontAwesome5 name="motorcycle" size={24} color="#555" />;
  }
};

const MarkerCallout = ({ deliveryAgentId, navigation, isVisible, setIsVisible, navigator, ...props }) => {
  const { response, fetchData, error, loading, clearError } = useAxios();

  const close = () => setIsVisible(false);

  const [deliveryAgent, setDeliveryAgent] = useState(null);

  useEffect(() => {
    console.log('hello');
    (async () => {
      await fetchData({ url: `/users/${deliveryAgentId}` });
    })();
  }, [deliveryAgentId]);

  useEffect(() => {
    if (response) setDeliveryAgent(response.user);
  }, [response]);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={close}>
            <FontAwesome5 name="chevron-down" size={40} color="#888" />
          </TouchableOpacity>
          <View style={styles.deliveryAgentInfo}>
            <Image source={{ uri: deliveryAgent?.profilePic }} style={styles.avatar} />
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{deliveryAgent?.fullName}</Text>
              <Text style={{ fontSize: 15, color: '#555', alignItems: 'center', marginTop: 10 }}>
                {deliveryAgent?.vehiculeType}
                <Text> </Text>
                <VehiculeIcon vehicule={deliveryAgent?.vehiculeType} />
              </Text>
            </View>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <FontAwesome5 name="phone-alt" size={24} color="#2196F3" />
              <Text style={{ color: '#2196F3', marginTop: 10 }}>CALL</Text>
            </TouchableOpacity>
          </View>
          <Button
            onPress={() => {
              navigation.navigate('RequestDelivery', { deliveryAgentId });
            }}
          >
            Request Delivery
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 500,
    borderColor: '#928E85',
    borderWidth: 1,
    marginRight: 20,
  },
  closeBtn: { marginLeft: 'auto', marginRight: 'auto' },
  modalContent: {
    marginTop: 'auto',
    height: 250,
    backgroundColor: 'white',
    paddingHorizontal: 40,
  },
  deliveryAgentInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
});
export default MarkerCallout;
