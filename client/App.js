import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { AuthProvider } from './src/shared/context/AuthContext';
import Stack from './src/navigation/Stack';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </AuthProvider>
  );
}
