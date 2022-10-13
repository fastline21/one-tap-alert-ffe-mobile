import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

const Stack = createNativeStackNavigator();

// Screens
import LoginScreen from './app/screens/login.screen';
import RegisterScreen from './app/screens/register.screen';
import CameraScreen from './app/screens/camera.screen';
import ResponderScreen from './app/screens/responder.screen';
import ResidentScreen from './app/screens/resident.screen';
import ReportScreen from './app/screens/report.screen';
import ViewCaptureImageScreen from './app/screens/view-capture-image.screen';
import MapScreen from './app/screens/map.screen';

// Test Screen Only
// import TestScreen from './app/screens/test.screen';
// import Test1Screen from './app/screens/test1.screen';

const App = () => {
  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
          {/* <Stack.Screen name="Test" component={TestScreen} /> */}
          {/* <Stack.Screen name="Test1" component={Test1Screen} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Resident" component={ResidentScreen} />
          <Stack.Screen name="Responder" component={ResponderScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Report" component={ReportScreen} />
          <Stack.Screen
            name="ViewCaptureImage"
            component={ViewCaptureImageScreen}
          />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
