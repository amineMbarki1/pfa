import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';

import Stack from './src/navigation/Stack';
import { AuthProvider } from './src/shared/context/AuthContext';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <Stack />
        </AuthProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
  /*
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <SwiperFlatList>
        <View style={{ width }}>
          <Text>First Signup</Text>
        </View>
        <View style={{ width }}>
          <Text>second signup</Text>
        </View>
      </SwiperFlatList>
    </View>
  );
  */
}
