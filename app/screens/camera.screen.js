import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import CameraView from '../components/camera.component';

// Screens
import MainScreen from './main.screen';

// Actions
import { createEmergencyProofs } from '../redux/actions/emergency-proofs.action';

const CameraScreen = ({
  route,
  navigation,
  emergencyState: { emergency },
  createEmergencyProofs,
}) => {
  const handleCapturedImage = (imageURI) => {
    alert(JSON.stringify(imageURI));
    console.log(JSON.stringify(imageURI));
    // const formData = new FormData();
    // formData.append('captured_image_uri', {
    //   uri: imageURI,
    //   type: 'image/jpeg',
    //   name: 'capture-image.jpg',
    // });
    // formData.append('emergency_id', emergency._id);
    // formData.append('emergency_category_id', '63477473f8023358d5000406');
    // createEmergencyProofs(formData);
  };

  return (
    <MainScreen>
      <CameraView
        cameraHeight={0}
        capturedImage={(imageURI) => handleCapturedImage(imageURI)}
      />
    </MainScreen>
  );
};

CameraScreen.propTypes = {
  emergencyState: PropTypes.object.isRequired,
  createEmergencyProofs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergencyState: state.emergencyState,
});

export default connect(mapStateToProps, { createEmergencyProofs })(
  CameraScreen
);
