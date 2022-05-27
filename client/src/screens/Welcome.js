import { View, StyleSheet } from 'react-native';

import Button from '../components/Button';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Auth')}>Create New Account</Button>
      <Button outline>Sign In As Guest</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, marginTop: 'auto', marginBottom: 20 },
});

export default Welcome;
