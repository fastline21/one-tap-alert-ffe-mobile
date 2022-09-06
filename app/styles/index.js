import { StyleSheet, Dimensions } from "react-native";

export const buttonStyle = StyleSheet.create({
	width: "80%",
	marginTop: 20,
});

export const logoImageStyle = StyleSheet.create({
	marginBottom: 30,
	width: 200,
	height: 200,
});

export const inputTextStyle = StyleSheet.create({
	outer: {
		width: "80%",
		height: 40,
		marginTop: 10,
		borderWidth: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	inner: {
		fontSize: 16,
	},
});

export const titleStyle = StyleSheet.create({
	width: "80%",
});

export const titleTextStyle = StyleSheet.create({
	fontSize: 18,
});

export const hyperLinkStyle = StyleSheet.create({
	color: "blue",
});

export const registerStyle = StyleSheet.create({
	marginTop: 10,
});

export const centerContentStyle = StyleSheet.create({
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
	paddingTop: 150,
	paddingBottom: 50,
});

export const imageBackgroundStyle = StyleSheet.create({
	width: Dimensions.get("window").width,
	height: Dimensions.get("window").height,
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: -1,
});
