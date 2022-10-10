import { View, Text, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import MapView from 'react-native-maps';

// Screens
import MainScreen from './main.screen';

const ReportScreen = ({ route, navigation }) => {
  console.log('Report Screen', { route, navigation });

  const LeftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="arrow-left"
      color="#000"
      style={{ backgroundColor: 'transparent' }}
    />
  );

  return (
    <MainScreen>
      {/* <View>
        <Text>Report Screen</Text>
      </View>
      <View style={{ margin: 20 }}>
        <Text>{route.params.title}</Text>
      </View>
      <View style={{ margin: 20 }}>
        <Text>ID: {route.params.id}</Text>
      </View> */}
      <Card>
        {/* <Card.Title title={route.params.title} left={LeftContent} /> */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 12,
          }}
        >
          <MapView
            style={{
              width: '100%',
              height: 200,
            }}
            showsUserLocation={true}
            region={{
              latitude: 14.512837133309143,
              longitude: 121.16307242562065,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: 14.512837133309143,
                longitude: 121.16307242562065,
              }}
              title="Marker"
            />
          </MapView>
        </View>
        <Card.Content>
          <Title>Name</Title>
          <Paragraph>Description</Paragraph>
        </Card.Content>
      </Card>
    </MainScreen>
  );
};

export default ReportScreen;
