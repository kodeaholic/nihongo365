import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import BackButton from '../../../components/BackButton';
import { theme } from '../../../theme/authTheme';
import { emailValidator } from '../../../helpers/emailValidator';
import { passwordValidator } from '../../../helpers/passwordValidator';
import { nameValidator } from '../../../helpers/nameValidator';
import { apiConfig } from '../../../api/config/apiConfig';
import { authHeader } from '../../../api/authHeader';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState({});
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      setIsSubmitted(true);
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });
  };

  useEffect(() => {
    if (isSubmitted) {
      async function registerRequest(bodyPayload) {
        const headers = await authHeader();
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(bodyPayload),
        };
        let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/auth/register`;
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          setResult(data);
          setIsSubmitted(false);
          return data;
        } catch (error) {
          return error;
        }
      }
      registerRequest({
        email: email.value,
        password: password.value,
        name: name.value,
      });
    }
  }, [email, isSubmitted, password, name]);

  useEffect(() => {
    if (!_.isEmpty(result) && result.user && result.tokens) {
      try {
        (async () => {
          await AsyncStorage.setItem('user', JSON.stringify(result.user));
          await AsyncStorage.setItem('tokens', JSON.stringify(result.tokens));
        })();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } catch (error) {
        // Error saving data
        ToastAndroid.showWithGravityAndOffset(
          'Không thể đăng ký với thông tin email và mật khẩu như trên',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      }
    } else if (!_.isEmpty(result)) {
      ToastAndroid.showWithGravityAndOffset(
        'Email đã được đăng ký',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
    }
  }, [navigation, result]);
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Đăng ký tài khoản</Header>
      <TextInput
        label="Tên bạn"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {!isSubmitted && (
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}>
          Đăng ký
        </Button>
      )}
      {isSubmitted && (
        <View style={[styles.container, styles.horizontal, styles.row]}>
          <ActivityIndicator size="large" />
          {/* <StatusBar barStyle="default" /> */}
        </View>
      )}
      {!isSubmitted && (
        <View style={styles.row}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
