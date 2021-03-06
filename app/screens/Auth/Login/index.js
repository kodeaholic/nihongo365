import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, ToastAndroid } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import BackButton from '../../../components/BackButton';
import { theme } from '../../../theme/authTheme';
import { emailValidator } from '../../../helpers/emailValidator';
import { passwordValidator } from '../../../helpers/passwordValidator';
import { apiConfig } from '../../../api/config/apiConfig';
import { authHeader } from '../../../api/authHeader';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState({});
  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      async function loginRequest(bodyPayload) {
        const headers = await authHeader();
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(bodyPayload),
        };
        let url = `${apiConfig.baseUrl}${apiConfig.apiEndpoint}/auth/login`;
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
      loginRequest({
        email: email.value,
        password: password.value,
      });
    }
  }, [email, isSubmitted, navigation, password]);

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
          'Email ho???c m???t kh???u ch??a ????ng',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
      }
    } else if (!_.isEmpty(result)) {
      ToastAndroid.showWithGravityAndOffset(
        'Email ho???c m???t kh???u ch??a ????ng',
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
      <Header>Ch??o m???ng tr??? l???i.</Header>
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
        label="M???t kh???u"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => {
            ToastAndroid.showWithGravityAndOffset(
              'T??nh n??ng l???y l???i m???t kh???u ch??a ???????c h??? tr???',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
          }}>
          <Text style={styles.forgot}>B???n qu??n m???t kh???u?</Text>
        </TouchableOpacity>
        {/* <Text style={styles.forgot}>B???n qu??n m???t kh???u?</Text> */}
      </View>
      {!isSubmitted && (
        <Button mode="contained" onPress={onLoginPressed}>
          ????ng nh???p
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
          <Text>B???n ch??a c?? t??i kho???n? </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>????ng k??</Text>
          </TouchableOpacity>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
