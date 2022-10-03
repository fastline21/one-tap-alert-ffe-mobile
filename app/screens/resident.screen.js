import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

// Screens
import MainScreen from './main.screen';

// Styles
import logoStyle from '../styles/logo.style';
import residentButtonStyle from '../styles/resident-button.style';

// Actions
import { getUserInfo } from '../redux/actions/user.action';
import { storeEmergency } from '../redux/actions/emergency.action';

// Utilities
import { removeToken } from '../utilities/token';

// Components
import LoadingComponent from '../components/loading.component';
import EmergencyTypesComponent from '../components/emergency-types.component';

const ResidentScreen = ({
  route,
  navigation,
  userState: { userInfo, loading: userLoading },
  emergencyTypesState: { emergencyTypes, loading: emergencyTypesLoading },
  authState: { user },
  emergencyState: { emergency },
  getUserInfo,
  storeEmergency,
}) => {
  // First run
  useEffect(() => {
    getUserInfo(route.params.userID);
  }, []);

  const handleDisaster = (emergencyTypeID) => {
    storeEmergency({ emergencyTypeID });
    navigation.navigate('Camera');
  };

  if (emergencyTypesLoading) {
    return <LoadingComponent />;
  }

  return (
    <MainScreen>
      <View style={[logoStyle.outer, { paddingTop: 100 }]}>
        <Image
          style={logoStyle.inner}
          fadeDuration={1000}
          source={require('./../assets/logo.png')}
        />
      </View>
      <View style={{ marginLeft: 50, marginBottom: 10 }}>
        <Text style={{ fontSize: 32 }}>
          Hi{' '}
          {!userInfo
            ? 'User'
            : `${userInfo?.first_name} ${userInfo?.last_name}`}
          !
        </Text>
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
  getUserInfo: PropTypes.func.isRequired,
  storeEmergency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state.userState,
  authState: state.authState,
  emergencyState: state.emergencyState,
  emergencyTypesState: state.emergencyTypesState,
});

export default connect(mapStateToProps, { getUserInfo, storeEmergency })(
  ResidentScreen
);
