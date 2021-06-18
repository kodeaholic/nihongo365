import AsyncStorage from '@react-native-community/async-storage';
import { get } from 'lodash';
export async function authHeader() {
  let tokens = await AsyncStorage.getItem('tokens');
  tokens = JSON.parse(tokens);
  let header = {
    'Content-Type': 'application/json',
  };
  let token = get(tokens, 'access.token');
  if (tokens && token) {
    header.Authorization = `Bearer ${token}`;
  }
  return header;
}
