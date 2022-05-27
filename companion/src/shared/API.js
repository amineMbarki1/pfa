import Constants from 'expo-constants';

const PORT = 5000;
const API = `http://${Constants.manifest.hostUri.split(':')[0]}:${PORT}`;

export default API;
