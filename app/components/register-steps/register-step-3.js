import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { useState, useRef } from 'react';

// Styles
import inputStyle from '../../styles/input.style';

// Actions
import { registerStep } from '../../redux/actions/register.action';

const RegisterStep3 = ({ nextStep, previousStep, registerStep }) => {
  const initialFormInput = {
    name: '',
    contactNo: '',
    email: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const nameRef = useRef();
  const contactNoRef = useRef();
  const emailRef = useRef();

  const { name, contactNo, email } = formInput;

  const handleSubmit = () => {
    registerStep({ contactPerson: formInput });
    setFormInput(initialFormInput);
    nextStep();
  };

  const handlePrevious = () => {
    previousStep();
  };

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };
  return (
    <>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('name', value)}
          value={name}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => contactNoRef.current.focus()}
          blurOnSubmit={false}
          ref={nameRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Contact No."
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('contactNo', value)}
          value={contactNo}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          blurOnSubmit={false}
          ref={contactNoRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('email', value)}
          value={email}
          style={inputStyle.inner}
          ref={emailRef}
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
        <Button onPress={handlePrevious}>Previous</Button>
        <Button onPress={handleSubmit}>Next</Button>
      </View>
    </>
  );
};

RegisterStep3.propTypes = {
  registerStep: PropTypes.func.isRequired,
};

export default connect(null, { registerStep })(RegisterStep3);
