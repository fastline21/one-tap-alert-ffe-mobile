import {
	View,
	Image,
	Text,
	Button,
	SafeAreaView,
	TextInput,
	ImageBackground,
	ScrollView,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { loginUser } from "../actions/authAction";

import { APP_SERVER_URL, APP_SERVER_API_KEY } from "@env";

import {
	centerContentStyle,
	buttonStyle,
	logoImageStyle,
	inputTextStyle,
	imageBackgroundStyle,
	hyperLinkStyle,
	titleStyle,
	titleTextStyle,
	registerStyle,
} from "../styles";

export default ({ navigation }) => {
	const initialFormData = {
		username: null,
		password: null,
	};

	const [formData, setFormData] = useState(initialFormData);

	const { username, password } = formData;

	const handleChangeInput = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	const storeToken = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const handleSubmit = async () => {
		const token = await loginUser(formData);
		storeToken("token", token);

		navigation.navigate("Home");
		setFormData(initialFormData);
	};

	const handleRegister = () => {
		navigation.navigate("Register");
	};

	return (
		<SafeAreaView>
			<ImageBackground
				source={require("./../assets/background.png")}
				resizeMode="cover"
				style={imageBackgroundStyle}
			>
				<ScrollView>
					<View style={centerContentStyle}>
						<View>
							<Image
								style={logoImageStyle}
								fadeDuration={1000}
								source={require("./../assets/logo.png")}
							/>
						</View>
						<View style={titleStyle}>
							<Text style={titleTextStyle}>Login to your Account</Text>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Username"
								autoCapitalize="none"
								onChangeText={(value) => handleChangeInput("username", value)}
								value={username}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Password"
								secureTextEntry={true}
								autoCapitalize="none"
								onChangeText={(value) => handleChangeInput("password", value)}
								value={password}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={buttonStyle}>
							<Button
								color="#ffde59"
								title="Login"
								onPress={async () => await handleSubmit()}
							/>
						</View>
						<View style={{ paddingTop: 20 }}>
							<Text>
								You don't have any account?{" "}
								<Text style={hyperLinkStyle} onPress={() => handleRegister()}>
									Register
								</Text>
							</Text>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};
