import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

import Button from '../components/Button';

const darkGrey = '#757575';
const mainColor = '#FD683D';

const PackageSizeField = ({ packageSize, selected, setSelected }) => {
  const getColorBySelection = () => (packageSize === selected ? mainColor : darkGrey);
  const handlePress = () => {
    setSelected(packageSize);
  };

  return (
    <TouchableOpacity
      disabled={packageSize === selected}
      onPress={handlePress}
      style={[
        styles.packageSize,
        { borderColor: getColorBySelection(), transform: [{ scale: packageSize === selected ? 1.1 : 1 }] },
      ]}
    >
      <Feather name="package" size={70} color={getColorBySelection()} />
      <Text style={[styles.packageSizeText, { color: getColorBySelection() }]}>{packageSize} Package</Text>
    </TouchableOpacity>
  );
};

const PackageSize = ({ next }) => {
  const [selected, setSelected] = useState('large');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Select Package Type</Text>

      {['large', 'medium', 'small'].map((type) => (
        <PackageSizeField packageSize={type} key={type} selected={selected} setSelected={setSelected} />
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
  packageSize: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    padding: 5,
    borderColor: mainColor,
    borderWidth: 2,
  },
  packageSizeText: { fontSize: 20, fontWeight: '500', marginLeft: 20 },
});

export default PackageSize;
