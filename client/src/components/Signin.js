import { Text, Alert, View, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Input from './Input';
import Button from './Button';

const Signin = (props) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => Alert.alert(JSON.stringify(data));
  return (
    <View>
      <Input
        Icon={<MaterialIcons name="email" size={24} color="#A7A9B7" />}
        label="Email"
        name="email"
        control={control}
      />
      <Input
        Icon={<Entypo name="lock" size={24} color="#A7A9B7" />}
        label="Password"
        name="password"
        control={control}
        secureTextEntry={true}
      />
      <Button onPress={handleSubmit(onSubmit)}>Signin</Button>
    </View>
  );
};

export default Signin;
