import {
	Text,
	View,
	SafeAreaView,
	Image,
	Button,
	StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

import { APP_SERVER_URL } from '@env';

export default ({ route, navigation }) => {
	const { data } = route.params;

	const [errorMessage, setErrorMessage] = useState(null);
	const [location, setLocation] = useState(null);

	const getLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== 'granted') {
			setErrorMessage('Permission to access location was denied');

			return;
		}

		const location = await Location.getCurrentPositionAsync({});

		setLocation(location);
	};

	const getAllEmergencyTypes = async () => {
		const res = await axios.get(`${APP_SERVER_URL}/emergency-types`);

		return res.data;
	};

	const handleActionAlert = async (name) => {
		const emergencyTypes = await getAllEmergencyTypes();

		const { id: emergency_type_id = 0 } = emergencyTypes.find(
			(element) => element.name === name
		);

		const { longitude, latitude } = location.coords;

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const data = {
			user_id: 1,
			emergency_type_id,
			longitude,
			latitude,
		};

		const res = await axios.post(`${APP_SERVER_URL}/emergencies`, data, config);

		console.log(res.data);
	};

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Image
				fadeDuration={1000}
				source={{
					width: 200,
					height: 200,
					uri: 'http://192.168.0.109:5000/images/logo.png',
				}}
			/>
			<View style={styles.name}>
				<Text style={styles.nameText}>Hi {data.username || 'User'}!</Text>
			</View>
			<View style={styles.button}>
				<Button
					title="Fire"
					onPress={async () => await handleActionAlert('Fire')}
					color="crimson"
				/>
			</View>
			<View style={styles.button}>
				<Button
					title="Flood"
					onPress={async () => await handleActionAlert('Flood')}
					color="khaki"
				/>
			</View>
			<View style={styles.button}>
				<Button
					title="Earthquake"
					// onPress={async () => await handleActionAlert('Earthquake')}
					onPress={() => navigation.navigate('Camera')}
					color="saddlebrown"
				/>
			</View>
			<View style={styles.button}>
				<Button title="Logout" onPress={() => navigation.goBack()} />
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: '80%',
		marginTop: 20,
	},
	image: {
		marginBottom: 30,
	},
	name: {
		marginTop: 20,
	},
	nameText: {
		fontSize: 30,
	},
});
