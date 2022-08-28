import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	SafeAreaView,
} from 'react-native';

export default ({ navigation }) => {
	const cameraRef = useRef();
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	const [cameraRatio, setCameraRatio] = useState(null);

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: 'center' }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Camera style={styles.camera} type={type}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
