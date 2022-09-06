import axios from "axios";

import { APP_SERVER_URL, APP_SERVER_API_KEY } from "@env";

import { setToken } from "../utilities/token";

export const getAllEmergencyTypes = async () => {
	await setToken("token");

	const config = {
		headers: {
			"Content-Type": "application/json",
			"x-api-key": APP_SERVER_API_KEY,
		},
	};

	const res = await axios.get(`${APP_SERVER_URL}/emergency-types`, config);

	const { data } = res.data;
	return data;
};
