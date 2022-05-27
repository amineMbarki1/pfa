import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import { useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
0;

const SelectVehiculeTypeDropdown = ({ control, name, rules, error, ...props }) => {
  const { field } = useController({ control, defaultValue: '', name, rules });
  const vehicules = ['Car/Van', 'Truck', 'Motorcycle/Scooter', 'Bike'];
  return (
    <>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#191D31' }}>Select Vehicule Type</Text>
      {error && <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#D32F2F' }}>{error}</Text>}
      <SelectDropdown
        buttonStyle={{
          marginTop: 10,
          marginBottom: 20,
          borderColor: !error ? '#F3F3F3' : '#D32F2F',
          borderWidth: 2,
          backgroundColor: 'transparent',
          width: '100%',
          borderRadius: 10,
          paddingHorizontal: 20,
        }}
        dropdownStyle={{ elevation: 2, borderRadius: 10 }}
        defaultButtonText="Select Your Vehicule Type"
        data={vehicules}
        renderDropdownIcon={(isOpened) => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
        }}
        dropdownIconPosition={'right'}
        onSelect={(selectedItem, index) => {
          field.onChange(selectedItem);
        }}
        renderCustomizedRowChild={(item, index) => {
          switch (index) {
            case 0:
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="car-side" size={24} color="black" />
                  <Text style={{ fontSize: 20, marginLeft: 10 }}>{item}</Text>
                </View>
              );
            case 1:
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="truck" size={24} color="black" />
                  <Text style={{ fontSize: 20, marginLeft: 10 }}>{item}</Text>
                </View>
              );
            case 2:
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="motorcycle" size={24} color="black" />
                  <Text style={{ fontSize: 20, marginLeft: 10 }}>{item}</Text>
                </View>
              );
            case 3:
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="bicycle" size={24} color="black" />
                  <Text style={{ fontSize: 20, marginLeft: 10 }}>{item}</Text>
                </View>
              );
          }
        }}
      />
    </>
  );
};

export default SelectVehiculeTypeDropdown;
