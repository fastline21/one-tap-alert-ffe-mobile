import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import mapStyle from '../styles/map.style';

// Actions
import { getCurrentLocation } from '../redux/actions/location.action';

// Components
import Loading from './loading.component';

// Constants
import { COORDINATES } from '../constants/coordinates';

const Map = ({
  height,
  locationState: { location, error },
  getCurrentLocation,
}) => {
  const initialCurrentLocation = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: COORDINATES.LATITUDE_DELTA,
    longitudeDelta: COORDINATES.LONGITUDE_DELTA,
  };

  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation
  );

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      setCurrentLocation({ ...currentLocation, latitude, longitude });
    }

    if (error) {
      alert(error);
    }
  }, [location, error]);

  return (
    <View style={mapStyle.outer}>
      <MapView
        style={[mapStyle.inner, height && { height }]}
        showsUserLocation={true}
        initialRegion={currentLocation}
        region={currentLocation}
      >
        <Marker coordinate={currentLocation} title="You are here" />
      </MapView>
    </View>
  );
};

Map.propTypes = {
  height: PropTypes.number,
  locationState: PropTypes.object.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  locationState: state.locationState,
});

export default connect(mapStateToProps, { getCurrentLocation })(Map);
