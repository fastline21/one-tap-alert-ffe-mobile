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

const MapScreen = ({ route, navigation, submitEmergency }) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: COORDINATES.LATITUDE_DELTA,
    longitudeDelta: COORDINATES.LONGITUDE_DELTA,
  });

  const handleSubmit = () => {
    submitEmergency({
      emergency_type_id: route.params.emergencyType,
      longitude: currentLocation.longitude,
      latitude: currentLocation.latitude,
    });
  };

  useEffect(() => {
    getLocation().then((location) => {
      const { longitude, latitude } = location.coords;
      setCurrentLocation({ ...currentLocation, longitude, latitude });
    });
  }, []);

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
  submitEmergency: PropTypes.func.isRequired,
};

export default connect(null, { submitEmergency })(MapScreen);
