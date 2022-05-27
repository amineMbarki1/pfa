import { View, Alert, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useContext, useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import Input from './Input';
import Button from './Button';
import useAxios from '../shared/hooks/useAxios';
import { AuthContext } from '../shared/context/AuthContext';
import SelectCityDropdown from './SelectCityDropdown';
import SelectVehiculeTypeDropdown from './SelectVehiculeTypeDropdown';

const { width } = Dimensions.get('window');

const Signup = (props) => {
  const swiperRef = useRef(null);

  const authContext = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { response, loading, error, fetchData, clearError } = useAxios();

  const onSubmit = (formData) => {
    clearError();
    formData.role = 'delivery_agent';
    fetchData({ url: '/users', method: 'post', data: formData });
  };

  useEffect(() => {
    if (response) {
      authContext.showUploadProfilePic();
      authContext.login({ user: response.user, token: response.token });
      Toast.show({ type: 'success', text1: 'user', text2: 'User created succefully' });
    }
  }, [response]);

  useEffect(() => {
    if (error && error.response)
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: error.response.data.message,
      });
  }, [error]);

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <SwiperFlatList ref={swiperRef}>
        <View style={{ width: width - 40 }}>
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
          <Button onPress={() => swiperRef.current.goToLastIndex()}>Next</Button>
        </View>

        <View style={{ width: width - 40, paddingHorizontal: 20 }}>
          <SelectCityDropdown
            name="city"
            control={control}
            rules={{ required: 'Your City is required' }}
            error={errors.city?.message}
          />
          <SelectVehiculeTypeDropdown
            name="vehiculeType"
            control={control}
            rules={{ required: 'Your City is required' }}
            error={errors.vehiculeType?.message}
          />
          <Button loading={loading} onPress={handleSubmit(onSubmit)}>
            Singup
          </Button>
        </View>
      </SwiperFlatList>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
