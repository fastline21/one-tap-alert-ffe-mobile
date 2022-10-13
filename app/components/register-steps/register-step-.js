import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import CameraView from '../camera.component';

// Actions
import { registerStep } from '../../redux/actions/register.action';

const RegisterStep4 = ({ nextStep, previousStep, registerStep }) => {
  const handlePrevious = () => {
    previousStep();
  };

  const handleNext = (data) => {
    registerStep({ captured_image_back: data });
    nextStep();
  };

  return (
    <>
      <CameraView capturedImage={(data) => handleNext(data)} />
      <View
        style={{
          lex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* <Button onPress={handlePrevious}>Previous</Button>
        <Button onPress={handleNext}>Next</Button> */}
      </View>
    </>
  );
};

RegisterStep4.propTypes = {
  registerStep: PropTypes.func.isRequired,
};

export default connect(null, { registerStep })(RegisterStep4);
