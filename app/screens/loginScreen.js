import { View, Image, Text, Button, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { authUser, loginUser } from '../actions/authAction';

import { getToken, removeToken } from '../utilities/token';

import MainScreen from './main.screen';

import { APP_SERVER_URL, APP_SERVER_API_KEY } from '@env';

import {
  buttonStyle,
  logoImageStyle,
  inputTextStyle,
  hyperLinkStyle,
  titleStyle,
  titleTextStyle,
  registerStyle,
} from '../styles';

export default ({ navigation }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const initialFormData = {
    username: null,
    password: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const { username, password } = formData;

  const handleChangeInput = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const storeToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const handleSubmit = async () => {
    const { token } = await loginUser(formData);
    storeToken('token', token);

    const auth = await authUser();

    if (auth.user_type === 'Resident') {
      navigation.navigate('Resident');
    } else if (auth.user_type === 'Responder') {
      navigation.navigate('Responder');
    } else {
      alert('Unauthorized user');
      removeToken('token');
    }

    setFormData(initialFormData);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  getToken('token')
    .then(async (data) => {
      if (data) {
        const auth = await authUser();

        if (auth.user_type === 'Resident') {
          return navigation.navigate('Resident');
        }

        if (auth.user_type === 'Responder') {
          return navigation.navigate('Responder');
        }
      }
    })
    .catch((error) => console.error('Error: getToken - Catch', { error }));

  return (
    <MainScreen>
      <View>
        <Image
          style={logoImageStyle}
          fadeDuration={1000}
          source={require('./../assets/logo.png')}
        />
      </View>
      <View style={titleStyle}>
        <Text style={titleTextStyle}>Login to your Account</Text>
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('username', value)}
          value={username}
          style={inputTextStyle.inner}
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('password', value)}
          value={password}
          style={inputTextStyle.inner}
          ref={passwordRef}
        />
      </View>
      <View style={buttonStyle}>
        <Button
          color="#ffde59"
          title="Login"
          onPress={async () => await handleSubmit()}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text>
          You don't have any account?{' '}
          <Text style={hyperLinkStyle} onPress={() => handleRegister()}>
            Register
          </Text>
        </Text>
      </View>
    </MainScreen>
  );
};
