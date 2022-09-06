import * as Location from "expo-location";

export const getLocation = async () => {
	const { status } = await Location.requestForegroundPermissionsAsync();

	if (status !== "granted") {
		setErrorMessage("Permission to access location was denied");

		return;
	}

	return await Location.getCurrentPositionAsync({});
};
