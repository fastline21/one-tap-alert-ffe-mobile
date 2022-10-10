import { View, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// Screens
import MainScreen from './main.screen';

// Actions
import { getAllEmergencies } from '../redux/actions/emergency.action';

// Components
import Loading from '../components/loading.component';

const ResponderScreen = ({
  navigation,
  emergencyState: { emergencies, loading, success, error, message },
  getAllEmergencies,
}) => {
  useEffect(() => {
    getAllEmergencies();
  }, []);

  if (loading || !emergencies) {
    return <Loading />;
  }

  return (
    <MainScreen>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 20,
          paddingBottom: 20,
        }}
      >
        {!emergencies.length ? (
          <Text>No emergencies found</Text>
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Disaster</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {emergencies.map((data, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{`${data.user_info.first_name} ${data.user_info.last_name}`}</DataTable.Cell>
                <DataTable.Cell>{data.emergency_type_id.name}</DataTable.Cell>
                <DataTable.Cell>{data.emergency_status_id.name}</DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    title="View"
                    onPress={() =>
                      navigation.navigate('Report', {
                        title: 'Resident Info',
                        id: data.id,
                      })
                    }
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </View>
    </MainScreen>
  );
};

ResponderScreen.propTypes = {
  emergencyState: PropTypes.object.isRequired,
  getAllEmergencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergencyState: state.emergencyState,
});

export default connect(mapStateToProps, {
  getAllEmergencies,
})(ResponderScreen);
