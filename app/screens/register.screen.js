import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useRef } from 'react';
import moment from 'moment';

import MainScreen from './main.screen';

import { createUser } from '../actions/usersAction';

import {
  logoImageStyle,
  titleStyle,
  titleTextStyle,
  inputTextStyle,
  buttonStyle,
  centerContentStyle,
  imageBackgroundStyle,
  hyperLinkStyle,
} from '../styles';

export default ({ navigation }) => {
  const initialFormData = {
    firstName: null,
    middleName: null,
    lastName: null,
    address: null,
    barangay: null,
    zipCode: null,
    birthDate: null,
    emailAddress: null,
    username: null,
    password: null,
    password2: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const barangayRef = useRef();
  const zipCodeRef = useRef();
  const birthDateRef = useRef();
  const emailAddressRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const {
    firstName,
    middleName,
    lastName,
    address,
    barangay,
    zipCode,
    birthDate,
    emailAddress,
    username,
    password,
    password2,
  } = formData;

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleChangeInput = (name, value, event = {}) => {
    if (name === 'birthDate') {
      setShowDatePicker(false);
      const { type } = event;

      if (type === 'dismissed') {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { middleName, ...rest } = formData;

    const isRequiredNull = Object.values(rest).some((value) => {
      if (value === null || value === undefined || value === '' || !value) {
        return true;
      }

      return false;
    });

    if (isRequiredNull) {
      alert('Please fill out all required fields');
      return;
    }

    const res = await createUser({
      ...formData,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email_address: emailAddress,
      birth_date: birthDate,
    });

    alert(res.message);

    setFormData(initialFormData);

    handleLogin();
  };

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
        <Text style={titleTextStyle}>Register your Account</Text>
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="First Name"
          onChangeText={(value) => handleChangeInput('firstName', value)}
          value={firstName}
          style={inputTextStyle.inner}
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => middleNameRef.current.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Middle Name (Optional)"
          onChangeText={(value) => handleChangeInput('middleName', value)}
          value={middleName}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => lastNameRef.current.focus()}
          blurOnSubmit={false}
          ref={middleNameRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Last Name"
          onChangeText={(value) => handleChangeInput('lastName', value)}
          value={lastName}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => addressRef.current.focus()}
          blurOnSubmit={false}
          ref={lastNameRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Address"
          onChangeText={(value) => handleChangeInput('address', value)}
          value={address}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => barangayRef.current.focus()}
          blurOnSubmit={false}
          ref={addressRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Barangay"
          onChangeText={(value) => handleChangeInput('barangay', value)}
          value={barangay}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => zipCodeRef.current.focus()}
          blurOnSubmit={false}
          ref={barangayRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Zip Code"
          onChangeText={(value) => handleChangeInput('zipCode', value)}
          value={zipCode}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => emailAddressRef.current.focus()}
          blurOnSubmit={false}
          ref={zipCodeRef}
        />
      </View>
      <TouchableOpacity
        style={inputTextStyle.outer}
        onPress={() => setShowDatePicker(!showDatePicker)}
        title="Birthdate"
      >
        <Text style={{ color: 'gray' }}>
          {!birthDate ? 'Birthdate' : moment(birthDate).format('MM/DD/YYYY')}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={!birthDate ? moment().toDate() : birthDate}
          onChange={(event, selectedDate) =>
            handleChangeInput('birthDate', selectedDate, event)
          }
          mode="date"
        />
      )}
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Email Address"
          onChangeText={(value) => handleChangeInput('emailAddress', value)}
          value={emailAddress}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => usernameRef.current.focus()}
          blurOnSubmit={false}
          ref={emailAddressRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => handleChangeInput('username', value)}
          value={username}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Password"
          onChangeText={(value) => handleChangeInput('password', value)}
          value={password}
          secureTextEntry={true}
          style={inputTextStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => password2Ref.current.focus()}
          blurOnSubmit={false}
          ref={passwordRef}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          placeholder="Confirm Password"
          onChangeText={(value) => handleChangeInput('password2', value)}
          value={password2}
          secureTextEntry={true}
          style={inputTextStyle.inner}
          ref={password2Ref}
        />
      </View>
      <View style={buttonStyle}>
        <Button onPress={async () => await handleSubmit()} title="Submit" />
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text>
          Have an account?{' '}
          <Text style={hyperLinkStyle} onPress={() => handleLogin()}>
            Login
          </Text>
        </Text>
      </View>
    </MainScreen>
  );
};
