import { View, Button, Text } from 'react-native';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Constants
import { COORDINATES } from '../constants/coordinates';

// Styles
import mapStyle from '../styles/map.style';

// Screens
import MainScreen from './main.screen';

// Utilities
import { getLocation } from '../utilities/location';

// Actions
import {
  submitEmergency,
  emergenciesClearResponse,
} from '../redux/actions/emergency.action';

const MapScreen = ({
  route,
  navigation,
  emergencyState: {
    emergency,
    loading: emergenciesLoading,
    success: emergenciesSuccess,
    error: emergenciesError,
    message: emergenciesMessage,
  },
  authState: { user },
  submitEmergency,
  emergenciesClearResponse,
}) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: COORDINATES.LATITUDE_DELTA,
    longitudeDelta: COORDINATES.LONGITUDE_DELTA,
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('emergency_type_id', emergency.emergencyTypeID);
    formData.append('longitude', currentLocation.longitude);
    formData.append('latitude', currentLocation.latitude);
    formData.append('captured_image_uri', {
      uri: emergency.imageURI,
      type: 'image/jpeg',
      name: 'capture-image.jpg',
    });

    submitEmergency(formData);
  };

  useEffect(() => {
    (async () => {
      try {
        const location = await getLocation();

        const { longitude, latitude } = location.coords;
        setCurrentLocation({ ...currentLocation, longitude, latitude });
      } catch (error) {
        setErrorMessage(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (emergenciesSuccess) {
      alert(emergenciesMessage);
      emergenciesClearResponse();
      navigation.navigate(user.user_type);
    }

    if (emergenciesError) {
      alert(emergenciesMessage);
      emergenciesClearResponse();
    }
  }, [emergenciesSuccess, emergenciesError]);

  return (
    <MainScreen>
      <View style={mapStyle.outer}>
        <MapView
          style={mapStyle.inner}
          showsUserLocation={true}
          initialRegion={currentLocation}
          region={currentLocation}
        >
          <Marker coordinate={currentLocation} title="You are here" />
        </MapView>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          paddingTop: 30,
        }}
      >
        <View>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
        <View>
          <Button
            title="Cancel"
            onPress={() => navigation.navigate(route.params.userType)}
          />
        </View>
      </View>
    </MainScreen>
  );
};

MapScreen.propTypes = {
  emergencyState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  submitEmergency: PropTypes.func.isRequired,
  emergenciesClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state.userState,
  authState: state.authState,
  emergencyState: state.emergencyState,
  emergencyTypesState: state.emergencyTypesState,
});

export default connect(mapStateToProps, {
  submitEmergency,
  emergenciesClearResponse,
})(MapScreen);
