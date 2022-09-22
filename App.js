import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import LoginScreen from './app/screens/loginScreen';
import RegisterScreen from './app/screens/registerScreen';
import CameraScreen from './app/screens/cameraScreen';
import ResponderScreen from './app/screens/responderScreen';
import ResidentScreen from './app/screens/resident.screen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Resident" component={ResidentScreen} />
        <Stack.Screen name="Responder" component={ResponderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
