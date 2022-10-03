import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import viewMapStyle from '../styles/view-map.style';
import viewMapButtonStyle from '../styles/view-map-button.style';

const ViewCaptureImageScreen = ({
  navigation,
  emergencyState: { emergency },
}) => {
  const handleSubmit = () => {
    navigation.navigate('Map');
  };

  const handleCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Camera' }],
      })
    );
  };

  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height }}>
      <ImageBackground
        source={{ uri: emergency.imageURI }}
        style={viewMapStyle.inner}
        resizeMode="stretch"
      />
      <View style={viewMapButtonStyle.outer}>
        <TouchableOpacity onPress={handleSubmit}>
          <Avatar.Icon icon="check" style={viewMapButtonStyle.inner} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel}>
          <Avatar.Icon icon="close" style={viewMapButtonStyle.inner} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

ViewCaptureImageScreen.propTypes = {
  userState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  emergencyState: PropTypes.object.isRequired,
  emergencyTypesState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state.userState,
  authState: state.authState,
  emergencyState: state.emergencyState,
  emergencyTypesState: state.emergencyTypesState,
});

export default connect(mapStateToProps, {})(ViewCaptureImageScreen);
