import {
	View,
	SafeAreaView,
	Text,
	TextInput,
	ImageBackground,
	Image,
	TouchableOpacity,
	Button,
	ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import moment from "moment";

import { createUser } from "../actions/usersAction";

import {
	logoImageStyle,
	titleStyle,
	titleTextStyle,
	inputTextStyle,
	buttonStyle,
	centerContentStyle,
	imageBackgroundStyle,
	hyperLinkStyle,
} from "../styles";

export default ({ navigation }) => {
	const initialFormData = {
		firstName: null,
		middleName: null,
		lastName: null,
		address: null,
		barangay: null,
		zipCode: null,
		birthDate: null,
		emailAddress: null,
		username: null,
		password: null,
		password2: null,
	};

	const [formData, setFormData] = useState(initialFormData);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const {
		firstName,
		middleName,
		lastName,
		address,
		barangay,
		birthDate,
		emailAddress,
		username,
		password,
		password2,
	} = formData;

	const handleLogin = () => {
		navigation.navigate("Login");
	};

	const handleChangeInput = (name, value, event = {}) => {
		if (name === "birthDate") {
			setShowDatePicker(false);
			const { type } = event;

			if (type === "dismissed") {
				return;
			}
		}

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async () => {
		const res = await createUser({
			...formData,
			first_name: firstName,
			middle_name: middleName,
			last_name: lastName,
			email_address: emailAddress,
			birth_date: birthDate,
		});

		alert(res.message);

		setFormData(initialFormData);
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
							<Text style={titleTextStyle}>Register your Account</Text>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="First Name"
								onChangeText={(value) => handleChangeInput("firstName", value)}
								value={firstName}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Middle Name (Optional)"
								onChangeText={(value) => handleChangeInput("middleName", value)}
								value={middleName}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Last Name"
								onChangeText={(value) => handleChangeInput("lastName", value)}
								value={lastName}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Address"
								onChangeText={(value) => handleChangeInput("address", value)}
								value={address}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Barangay"
								onChangeText={(value) => handleChangeInput("barangay", value)}
								value={barangay}
								style={inputTextStyle.inner}
							/>
						</View>
						<TouchableOpacity
							style={inputTextStyle.outer}
							onPress={() => setShowDatePicker(!showDatePicker)}
							title="Birthdate"
						>
							<Text style={{ color: "gray" }}>
								{!birthDate
									? "Birthdate"
									: moment(birthDate).format("MM/DD/YYYY")}
							</Text>
						</TouchableOpacity>
						{showDatePicker && (
							<DateTimePicker
								testID="dateTimePicker"
								value={!birthDate ? moment().toDate() : birthDate}
								onChange={(event, selectedDate) =>
									handleChangeInput("birthDate", selectedDate, event)
								}
								mode="date"
							/>
						)}
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Email Address"
								onChangeText={(value) =>
									handleChangeInput("emailAddress", value)
								}
								value={emailAddress}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Username"
								onChangeText={(value) => handleChangeInput("username", value)}
								value={username}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Password"
								onChangeText={(value) => handleChangeInput("password", value)}
								value={password}
								secureTextEntry={true}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={inputTextStyle.outer}>
							<TextInput
								placeholder="Confirm Password"
								onChangeText={(value) => handleChangeInput("password2", value)}
								value={password2}
								secureTextEntry={true}
								style={inputTextStyle.inner}
							/>
						</View>
						<View style={buttonStyle}>
							<Button
								onPress={async () => await handleSubmit()}
								title="Submit"
							/>
						</View>
						<View style={{ paddingTop: 20 }}>
							<Text>
								Have an account?{" "}
								<Text style={hyperLinkStyle} onPress={() => handleLogin()}>
									Login
								</Text>
							</Text>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};
