import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

import Button from './Button';

const darkGrey = '#757575';
const mainColor = '#FD683D';

const DeliveryTypeField = ({ deliveryType, selected, setSelected }) => {
  const getColorBySelection = () => (deliveryType === selected ? mainColor : darkGrey);
  const handlePress = () => {
    setSelected(deliveryType);
  };

  return (
    <TouchableOpacity
      disabled={deliveryType === selected}
      onPress={handlePress}
      style={[
        styles.deliveryType,
        { borderColor: getColorBySelection(), transform: [{ scale: deliveryType === selected ? 1.1 : 1 }] },
      ]}
    >
      <Text style={[styles.deliveryTypeText, { color: getColorBySelection() }]}>
        {deliveryType === 'express' ? '24H' : '48h'}
      </Text>
      <Feather name="package" size={70} color={getColorBySelection()} />
      <Text style={[styles.deliveryTypeText, { color: getColorBySelection() }]}>{deliveryType} Delivery</Text>
    </TouchableOpacity>
  );
};

const DeliveryType = ({ next }) => {
  const [selected, setSelected] = useState('large');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Select Delivery Type</Text>

      {['express', 'standard'].map((type) => (
        <DeliveryTypeField deliveryType={type} key={type} selected={selected} setSelected={setSelected} />
      ))}

      <Button primary onPress={next} style={{ marginTop: 10 }}>
        Next
      </Button>
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { height, width, paddingHorizontal: 40, marginTop: 50 },
  title: { fontSize: 25, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  deliveryType: {
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    padding: 10,
    borderColor: mainColor,
    borderWidth: 2,
  },
  deliveryTypeText: { fontSize: 20, fontWeight: '500', marginLeft: 20 },
});

export default DeliveryType;
