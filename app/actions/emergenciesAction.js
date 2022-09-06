import axios from "axios";

import { APP_SERVER_URL, APP_SERVER_API_KEY } from "@env";

import { setToken } from "../utilities/token";

export const createEmergency = async (body) => {
	setToken("token");

	const config = {
		headers: {
			"Content-Type": "application/json",
			"x-api-key": APP_SERVER_API_KEY,
		},
	};

	const res = await axios.post(`${APP_SERVER_URL}/emergencies`, body, config);

	const { data } = res.data;
	return data;
};
