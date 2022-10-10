import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { useState, useRef } from 'react';

// Styles
import inputStyle from '../../styles/input.style';

// Actions
import { registerStep } from '../../redux/actions/register.action';

const RegisterStep2 = ({ nextStep, previousStep, registerStep }) => {
  const initialFormInput = {
    contactNo: '',
    address: '',
    barangay: '',
    city: '',
    postalCode: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const contactNoRef = useRef();
  const addressRef = useRef();
  const barangayRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();

  const { contactNo, address, barangay, city, postalCode } = formInput;

  const handleSubmit = () => {
    registerStep(formInput);
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
          placeholder="Contact No."
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('contactNo', value)}
          value={contactNo}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => addressRef.current.focus()}
          blurOnSubmit={false}
          ref={contactNoRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Address"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('address', value)}
          value={address}
          style={inputStyle.inner}
          multiline={true}
          numberOfLines={4}
          returnKeyType="next"
          onSubmitEditing={() => barangayRef.current.focus()}
          blurOnSubmit={false}
          ref={addressRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Barangay"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('barangay', value)}
          value={barangay}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => cityRef.current.focus()}
          blurOnSubmit={false}
          ref={barangayRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="City"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('city', value)}
          value={city}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => postalCodeRef.current.focus()}
          blurOnSubmit={false}
          ref={cityRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Postal Code"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('postalCode', value)}
          value={postalCode}
          style={inputStyle.inner}
          ref={postalCodeRef}
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

RegisterStep2.propTypes = {
  registerState: PropTypes.object.isRequired,
  registerStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  registerState: state.registerState,
});

export default connect(mapStateToProps, { registerStep })(RegisterStep2);
