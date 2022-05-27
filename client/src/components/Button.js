import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ outline, primary, loading, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      disabled={loading}
      style={{
        ...styles.button,
        ...(outline ? styles.buttonOutline : styles.buttonPrimary),
      }}
    >
      <Text style={{ color: outline ? '#555' : '#fff', fontSize: 20, textAlign: 'center' }}>
        {loading ? <Text>Loading... </Text> : rest.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { borderRadius: 30, paddingVertical: 15, marginTop: 20 },
  buttonPrimary: { backgroundColor: '#FD683D' },
  buttonOutline: { borderColor: '#FD683d', borderWidth: 2 },
});

export default Button;
