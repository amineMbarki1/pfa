import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import { useController } from 'react-hook-form';
import { Text } from 'react-native';

const SelectCityDropdpown = ({ control, name, rules, error, ...props }) => {
  const { field } = useController({ control, defaultValue: '', name, rules });
  const cities = ['Tunis', 'sousse', 'Monastir', 'Nabeul'];
  return (
    <>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#191D31' }}>Select City</Text>
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
        defaultButtonText="Select City"
        data={cities}
        renderDropdownIcon={(isOpened) => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
        }}
        dropdownIconPosition={'right'}
        onSelect={(selectedItem, _) => {
          field.onChange(selectedItem);
        }}
      />
    </>
  );
};

export default SelectCityDropdpown;
