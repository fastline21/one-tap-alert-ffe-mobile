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

import { removeToken } from '../utilities/token';

const ResidentScreen = ({
  route,
  navigation,
  userState: { userInfo },
  getUserInfo,
}) => {
  // First run
  useEffect(() => {
    getUserInfo(route.params.userID);
  }, []);

  const handleDisaster = (type) => {
    navigation.navigate('Camera', {
      emergencyType: type,
      userType: route.params.userType,
    });
  };

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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={[
            residentButtonStyle.outer,
            residentButtonStyle.inner.fireColor,
          ]}
          onPress={() => handleDisaster('fire')}
        >
          <Text style={residentButtonStyle.inner.text}>Fire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            residentButtonStyle.outer,
            residentButtonStyle.inner.floodColor,
          ]}
          onPress={() => handleDisaster('flood')}
        >
          <Text style={residentButtonStyle.inner.text}>Flood</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            residentButtonStyle.outer,
            residentButtonStyle.inner.earthquakeColor,
          ]}
          onPress={() => handleDisaster('earthquake')}
        >
          <Text style={residentButtonStyle.inner.text}>Earthquake</Text>
        </TouchableOpacity>
      </View>
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
  getUserInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps, { getUserInfo })(ResidentScreen);
