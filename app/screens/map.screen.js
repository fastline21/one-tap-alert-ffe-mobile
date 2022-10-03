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
import { submitEmergency } from '../redux/actions/emergency.action';

const MapScreen = ({
  route,
  navigation,
  emergencyState: { emergency },
  submitEmergency,
}) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: COORDINATES.LATITUDE_DELTA,
    longitudeDelta: COORDINATES.LONGITUDE_DELTA,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = () => {
    submitEmergency({
      emergency_type_id: emergency.emergencyTypeID,
      image_uri: emergency.imageURI,
      longitude: currentLocation.longitude,
      latitude: currentLocation.latitude,
    });
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

  return (
    <MainScreen>
      {errorMessage && alert(errorMessage)}
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
  submitEmergency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state.userState,
  authState: state.authState,
  emergencyState: state.emergencyState,
  emergencyTypesState: state.emergencyTypesState,
});

export default connect(mapStateToProps, { submitEmergency })(MapScreen);
