import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useContext } from 'react';
import Toast from 'react-native-toast-message';

import Input from './Input';
import Button from './Button';
import useAxios from '../shared/hooks/useAxios';
import { AuthContext } from '../shared/context/AuthContext';

const Signin = (props) => {
  const authContext = useContext(AuthContext);
  const { control, handleSubmit } = useForm();
  const { fetchData, error, response, clearError, loading } = useAxios();

  const onSubmit = (data) => {
    clearError();
    fetchData({ url: '/users/login', method: 'post', data });
  };

  useEffect(() => {
    if (response) {
      authContext.login({ user: response.user, token: response.token });
      Toast.show({ type: 'success', text1: 'user', text2: 'Signed in  succefully' });
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: error.message,
      });
    }
    if (error && error.response)
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: error.response.data.message,
      });
  }, [error]);

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
      <Button loading={loading} onPress={handleSubmit(onSubmit)}>
        Signin
      </Button>
    </View>
  );
};

export default Signin;
