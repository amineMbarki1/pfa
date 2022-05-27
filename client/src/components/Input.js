import { TextInput, Text, View } from 'react-native';
import { useController } from 'react-hook-form';

const Input = ({ label, Icon, name, control, rules, error, ...props }) => {
  const { field } = useController({ control, defaultValue: '', name, rules });
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#191D31' }}>{label}</Text>
      {/* {error && <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#D32F2F' }}>{error}</Text>} */}
      <View
        style={{
          borderColor: !error ? '#F3F3F3' : '#D32F2F',
          borderWidth: 2,
          borderRadius: 15,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        {Icon}
        <TextInput
          {...props}
          value={field.value}
          onChangeText={field.onChange}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            fontSize: 17,
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

export default Input;
