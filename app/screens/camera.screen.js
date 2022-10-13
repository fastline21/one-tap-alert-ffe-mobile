import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// Components
import CameraView from '../components/camera.component';
import Loading from '../components/loading.component';

// Screens
import MainScreen from './main.screen';

// Actions
import {
  createEmergencyProofs,
  emergencyProofsClearResponse,
} from '../redux/actions/emergency-proofs.action';

const CameraScreen = ({
  route,
  navigation,
  emergencyState: { emergency },
  emergencyProofsState: { success, message, error, loading },
  authState: { user },
  createEmergencyProofs,
  emergencyProofsClearResponse,
}) => {
  const handleCapturedImage = (imageURI) => {
    const formData = new FormData();
    formData.append('captured_image_uri', {
      uri: imageURI,
      type: 'image/jpeg',
      name: 'capture-image.jpg',
    });
    formData.append('emergency_id', emergency._id);
    formData.append('emergency_category_id', '63477473f8023358d5000406');
    createEmergencyProofs(formData);
  };

  useEffect(() => {
    if (success) {
      Alert.alert('Success', message);
      emergencyProofsClearResponse();
      navigation.navigate(user.user_type);
    }

    if (error) {
      Alert.alert('Error', message);
      emergencyProofsClearResponse();
    }
  }, [success, message, error]);

  if (loading) {
    return <Loading />;
  }

  return (
    <MainScreen>
      <CameraView
        cameraHeight={0}
        capturedImage={(imageURI) => handleCapturedImage(imageURI)}
      />
      <Text>{JSON.stringify(emergency)}</Text>
      <Text>{JSON.stringify(loading)}</Text>
      <Text>{JSON.stringify(user)}</Text>
    </MainScreen>
  );
};

CameraScreen.propTypes = {
  emergencyState: PropTypes.object.isRequired,
  emergencyProofsState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  createEmergencyProofs: PropTypes.func.isRequired,
  emergencyProofsClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergencyState: state.emergencyState,
  emergencyProofsState: state.emergencyProofsState,
  authState: state.authState,
});

export default connect(mapStateToProps, {
  createEmergencyProofs,
  emergencyProofsClearResponse,
})(CameraScreen);
