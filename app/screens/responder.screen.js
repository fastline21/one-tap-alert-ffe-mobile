import { View, Text, Button } from 'react-native';
import MainScreen from './main.screen';
import { DataTable } from 'react-native-paper';

const ResponderScreen = ({ navigation }) => {
  const sample = [
    {
      id: 1,
      name: 'Test 1',
      disaster: 'Fire',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Test 2',
      disaster: 'Fire',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Test 3',
      disaster: 'Fire',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Test 4',
      disaster: 'Fire',
      status: 'Pending',
    },
    {
      id: 5,
      name: 'Test 5',
      disaster: 'Fire',
      status: 'Pending',
    },
  ];
  return (
    <MainScreen>
      <View>
        <Text>Responder Screen</Text>
      </View>
      <View>
        <Text>Reports</Text>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 20,
          paddingBottom: 20,
        }}
      >
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Disaster</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Action</DataTable.Title>
          </DataTable.Header>
          {sample.map((data, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{data.name}</DataTable.Cell>
              <DataTable.Cell>{data.disaster}</DataTable.Cell>
              <DataTable.Cell>{data.status}</DataTable.Cell>
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
      </View>
    </MainScreen>
  );
};

export default ResponderScreen;
