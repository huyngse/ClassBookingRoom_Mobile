import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const iosConfig = {
  clientId: 'x',
  appId: 'x',
  apiKey: 'x',
  databaseURL: 'x',
  storageBucket: 'x',
  messagingSenderId: 'x',
  projectId: 'x',
  persistence: true,
};
const androidConfig = {
  clientId: 'x',
  appId: 'x',
  apiKey: 'x',
  databaseURL: 'x',
  storageBucket: 'x',
  messagingSenderId: 'x',
  projectId: 'x',
  persistence: true,
};

firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig, 'class-booking-room');
const storage = firebase.storage();
const auth = firebase.auth();

export { storage, auth };
