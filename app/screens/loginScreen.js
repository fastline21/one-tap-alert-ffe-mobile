import {
	View,
	Image,
	Text,
	Button,
	SafeAreaView,
	StyleSheet,
	TextInput,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { APP_SERVER_URL } from '@env';

export default ({ navigation }) => {
	const initialFormData = {
		username: '',
		password: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const handleChangeInput = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	const getAllUsers = async () => {
		const res = await axios.get(`${APP_SERVER_URL}/users`);
		const data = await res.data;

		console.log(data);
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Image
				style={styles.image}
				fadeDuration={1000}
				source={{
					width: 200,
					height: 200,
					uri: 'http://192.168.0.109:5000/images/logo.png',
				}}
			/>
			<View style={styles.title}>
				<Text style={{ fontSize: 18 }}>Login to your Account</Text>
			</View>
			<View style={styles.input}>
				<TextInput
					placeholder="Username"
					autoCapitalize="none"
					onChangeText={(value) => handleChangeInput('username', value)}
					value={formData.username}
				/>
			</View>
			<View style={styles.input}>
				<TextInput
					placeholder="Password"
					secureTextEntry={true}
					autoCapitalize="none"
					onChangeText={(value) => handleChangeInput('password', value)}
					value={formData.password}
				/>
			</View>
			<View style={styles.button}>
				<Button
					color="#ffde59"
					title="Login"
					onPress={() => {
						navigation.navigate('Home', {
							data: formData,
						});
						setFormData(initialFormData);
					}}
				/>
			</View>
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
	input: {
		width: '80%',
		height: 40,
		marginTop: 10,
		borderBottomWidth: 1,
		padding: 10,
		paddingLeft: 0,
	},
	title: {
		width: '80%',
	},
	image: {
		marginBottom: 30,
	},
});
