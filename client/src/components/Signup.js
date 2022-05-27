import { View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useContext, useEffect } from 'react';

import Input from './Input';
import Button from './Button';
import useAxios from '../shared/hooks/useAxios';
import { AuthContext } from '../shared/context/AuthContext';

const Signup = (props) => {
  const authContext = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { response, loading, error, fetchData, clearError } = useAxios();

  const onSubmit = (formData) => {
    clearError();
    fetchData({ url: '/users', method: 'post', data: formData });
  };

  useEffect(() => {
    if (response) authContext.login({ user: response.user, token: response.token });
  }, [response]);

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <View>
        <Input
          Icon={<Ionicons name="person-circle" size={24} color="#A7A9B7" />}
          label="Full Name"
          name="fullName"
          control={control}
          rules={{ required: 'Your Fullname is required' }}
          error={errors.fullName?.message}
        />

        <Input
          Icon={<MaterialIcons name="email" size={24} color="#A7A9B7" />}
          label="Email"
          name="email"
          control={control}
          rules={{ required: 'Your Email is required' }}
          error={errors.email?.message}
        />
        <Input
          Icon={<FontAwesome name="phone" size={24} color="#A7A9B7" />}
          label="Phone"
          name="phone"
          control={control}
          rules={{ required: 'Your Phone is required' }}
          error={errors.phone?.message}
        />
        <Input
          Icon={<Entypo name="lock" size={24} color="#A7A9B7" />}
          label="Password"
          name="password"
          control={control}
          secureTextEntry={true}
          rules={{ required: 'Password is required' }}
          error={errors.password?.message}
        />

        <Button loading={loading} onPress={handleSubmit(onSubmit)}>
          Singup
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
