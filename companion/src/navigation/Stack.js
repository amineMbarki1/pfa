import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';

import Auth from '../screens/Auth';
import Home from '../screens/Home';
import UploadProfilePic from '../screens/UploadProfilePic';
import { AuthContext } from '../shared/context/AuthContext';

const Stack = createStackNavigator();

const AuthStack = () => {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#fff' } }}>
      {authContext.isLoggedIn ? (
        <>
          {authContext.renderUploadProfilePic && (
            <Stack.Screen name="uploadProfilePic" component={UploadProfilePic} />
          )}
          <Stack.Screen name="home" component={Home} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={Auth} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
