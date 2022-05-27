import { Text, View, TouchableOpacity, Dimensions, Animated, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';

import Signup from '../components/Signup';
import Signin from '../components/Signin';

const Auth = (props) => {
  // 0 for Signup, 1 for signin
  const [activeButton, setActiveButton] = useState(0);

  const toggleAnim = useRef(new Animated.Value(0)).current;

  const toggleButton = (switchTo) => () => {
    setActiveButton(switchTo);
    Animated.timing(toggleAnim, {
      toValue: switchTo === 0 ? 0 : (width - 40) / 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={styles.actionsWrapper}>
        <Animated.View
          style={{
            ...styles.activeButton,
            transform: [{ translateX: toggleAnim }],
          }}
        />
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity onPress={toggleButton(0)} style={styles.toggleButton}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleButton(1)} style={styles.toggleButton}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>Signin</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeButton === 0 ? <Signup /> : <Signin />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  actionsWrapper: {
    backgroundColor: '#F8F9FB',
    height: 50,
    borderRadius: 50,
    marginVertical: 40,
  },
  activeButton: {
    height: '100%',
    backgroundColor: 'lightblue',
    width: '50%',
    borderRadius: 50,
    position: 'relative',
  },
  toggleButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    marginTop: -50,
  },
});

export default Auth;
