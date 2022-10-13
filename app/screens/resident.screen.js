import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Avatar, Drawer } from 'react-native-paper';

// Screens
import MainScreen from './main.screen';

// Styles
import residentButtonStyle from '../styles/resident-button.style';

// Actions
import { getUserInfo } from '../redux/actions/user.action';
import {
  storeEmergency,
  submitEmergency,
  emergenciesClearResponse,
  clearEmergency,
} from '../redux/actions/emergency.action';

// Utilities
import { removeToken } from '../utilities/token';

// Components
import LoadingComponent from '../components/loading.component';
import EmergencyTypesComponent from '../components/emergency-types.component';
import Map from '../components/map.component';

const ResidentScreen = ({
  route,
  navigation,
  userState: { userInfo, loading: userLoading },
  emergencyTypesState: { emergencyTypes, loading: emergencyTypesLoading },
  authState: { user },
  emergencyState: {
    emergency,
    message: emergencyMessage,
    success: emergencySuccess,
    error: emergencyError,
  },
  locationState: { location, loading: locationLoading },
  getUserInfo,
  storeEmergency,
  submitEmergency,
  emergenciesClearResponse,
  clearEmergency,
}) => {
  const [active, setActive] = useState('');

  // First run
  useEffect(() => {
    getUserInfo(user.user_id);
  }, []);

  const handleDisaster = (emergencyTypeID) => {
    const { latitude, longitude } = location;
    submitEmergency({
      emergency_type_id: emergencyTypeID,
      latitude,
      longitude,
    });
    storeEmergency({ emergencyTypeID });
  };

  const handleCamera = () => {
    navigation.navigate('Camera');
  };

  const handleClearEmergency = () => {
    clearEmergency();
  };

  useEffect(() => {
    if (userInfo) {
      navigation.setOptions({
        title: `${userInfo?.first_name} ${userInfo?.last_name}`,
      });
    }

    if (emergencySuccess) {
      Alert.alert(
        'Success',
        `${emergencyMessage}. Do you want to capture a proof?`,
        [
          {
            text: 'Yes',
            onPress: () => handleCamera(),
          },
          {
            text: 'No',
            style: 'cancel',
            onPress: () => handleClearEmergency(),
          },
        ]
      );
      emergenciesClearResponse();
    }

    if (emergencyError) {
      alert(emergencyMessage);
      emergenciesClearResponse();
    }
  }, [userInfo, emergencyMessage, emergencySuccess, emergencyError]);

  if (emergencyTypesLoading) {
    return <LoadingComponent />;
  }

  return (
    <MainScreen>
      <View style={{ marginBottom: 30 }}>
        <Map height={300} />
      </View>
      <EmergencyTypesComponent
        data={{ emergencyTypes }}
        action={{ handleDisaster }}
      />
      <View>
        <Button
          onPress={async () => {
            await removeToken('auth_token');
            navigation.navigate('Login');
          }}
        >
          Logout
        </Button>
      </View>
    </MainScreen>
  );
};

ResidentScreen.propTypes = {
  userState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  emergencyTypesState: PropTypes.object.isRequired,
  locationState: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  storeEmergency: PropTypes.func.isRequired,
  submitEmergency: PropTypes.func.isRequired,
  emergenciesClearResponse: PropTypes.func.isRequired,
  clearEmergency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state.userState,
  authState: state.authState,
  emergencyState: state.emergencyState,
  emergencyTypesState: state.emergencyTypesState,
  locationState: state.locationState,
});

export default connect(mapStateToProps, {
  getUserInfo,
  storeEmergency,
  submitEmergency,
  emergenciesClearResponse,
  clearEmergency,
})(ResidentScreen);
