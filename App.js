import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from './app/screens/homeScreen';
import LoginScreen from './app/screens/loginScreen';
import CameraScreen from './app/screens/cameraScreen';

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Camera" component={CameraScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
