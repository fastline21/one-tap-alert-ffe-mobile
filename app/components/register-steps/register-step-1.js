import { View, Text, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

// Styles
import inputStyle from '../../styles/input.style';

// Actions
import { registerStep } from '../../redux/actions/register.action';

const RegisterStep1 = ({ nextStep, cancelStep, registerStep }) => {
  const initialFormInput = {
    firstName: '',
    middleInitial: '',
    lastName: '',
    username: '',
    emailAddress: '',
    password: '',
    password2: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const firstNameRef = useRef();
  const middleInitialRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailAddressRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const {
    firstName,
    middleInitial,
    lastName,
    username,
    emailAddress,
    password,
    password2,
  } = formInput;

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = () => {
    registerStep(formInput);
    setFormInput(initialFormInput);
    nextStep();
  };

  const handleCancel = () => {
    cancelStep();
  };

  return (
    <>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="First Name"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('firstName', value)}
          value={firstName}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => lastNameRef.current.focus()}
          blurOnSubmit={false}
          ref={firstNameRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Last Name"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('lastName', value)}
          value={lastName}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => middleInitialRef.current.focus()}
          blurOnSubmit={false}
          ref={lastNameRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Middle Initial"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('middleInitial', value)}
          value={middleInitial}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => usernameRef.current.focus()}
          blurOnSubmit={false}
          ref={middleInitialRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('username', value)}
          value={username}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => emailAddressRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Email Address"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('emailAddress', value)}
          value={emailAddress}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          ref={emailAddressRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('password', value)}
          secureTextEntry={true}
          value={password}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => password2Ref.current.focus()}
          blurOnSubmit={false}
          ref={passwordRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Confirm Password"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('password2', value)}
          secureTextEntry={true}
          value={password2}
          style={inputStyle.inner}
          returnKeyType="next"
          blurOnSubmit={false}
          ref={password2Ref}
        />
      </View>
      <View
        style={{
          lex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button onPress={handleCancel}>Cancel</Button>
        <Button onPress={handleSubmit}>Next</Button>
      </View>
    </>
  );
};

RegisterStep1.propTypes = {
  registerStep: PropTypes.func.isRequired,
};

export default connect(null, { registerStep })(RegisterStep1);
