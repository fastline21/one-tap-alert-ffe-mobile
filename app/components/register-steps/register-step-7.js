import { Text, View, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { registerStep } from '../../redux/actions/register.action';

import titleStyle from '../../styles/title.style';

const RegisterStep6 = ({ previousStep, registerState: { register } }) => {
  const handlePrevious = () => {
    previousStep();
  };

  const handleSubmit = () => {
    nextStep();
  };

  return (
    <>
      <View style={titleStyle.outer}>
        <Text style={titleStyle.inner}>Personal Information:</Text>
      </View>
      <View style={titleStyle.outer}>
        <Text>
          Name: {register.firstName} {register.middleInitial}{' '}
          {register.lastName}
        </Text>
      </View>
      <View style={titleStyle.outer}>
        <Text>Address: {register.address}</Text>
      </View>
      <View style={titleStyle.outer}>
        <Text>Postal Code: {register.postalCode}</Text>
      </View>
      <View style={titleStyle.outer}>
        <Text>
          Back ID:{' '}
          <Image
            source={{ uri: register.captured_image_back }}
            style={{ width: 100, height: 100 }}
          />
        </Text>
      </View>
      <View style={titleStyle.outer}>
        <Text>
          Selfie ID:{' '}
          <Image
            source={{ uri: register.captured_image_front }}
            style={{ width: 100, height: 100 }}
          />
        </Text>
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
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </>
  );
};

RegisterStep6.propTypes = {
  registerStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  registerState: state.registerState,
});

export default connect(mapStateToProps, { registerStep })(RegisterStep6);
