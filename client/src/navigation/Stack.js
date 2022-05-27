import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';

import Auth from '../screens/Auth';
import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import RequestDelivery from '../screens/RequestDelivery';
import { AuthContext } from '../shared/context/AuthContext';

const Stack = createStackNavigator();

const AuthStack = () => {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#fff' } }}>
      {authContext.isLoggedIn ? (
        <>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="RequestDelivery" component={RequestDelivery} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Auth" component={Auth} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
