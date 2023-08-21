// import packages and libraries
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import InputField from "../components/authComponents/InputField";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { signInExistingUser } from "../utils/authHandler";

// component for sign in screen
const SignInForm = ({ navigation }) => {
	// state variables
	const [securedText, setSecuredText] = useState(false);
	const [iconName, setIconName] = useState("eye-off");
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [userId, setUserId] = useState(null);

	// decides if password should be visible or not
	const handleVisibilityChange = () => {
		setSecuredText(!securedText);
		if (securedText === false) {
			setIconName("eye");
		} else {
			setIconName("eye-off");
		}
	};

	// handles login action
	const handleSubmit = () => {
		if (email !== null && password !== null) {
			// login action authenticated via firebase
			signInExistingUser(email, password);
			// storing user Id
			setUserId(email.split("@")[0]);
			console.log("Logged In");
		} else {
			console.log("try again");
		}
	};

	// once user signs in, taken to next page
	useEffect(() => {
		if (userId !== null && userId !== undefined) {
			navigation.navigate("Home", {
				screen: "I-do",
				params: { userId: userId },
			});
		}
	}, [userId]);

	return (
		// main view
		<ScrollView>
			{/* page headline */}
			<Text style={styles.headline}>Sign in to an account</Text>
			{/* email field */}
			<InputField
				label="Email"
				placeholder="Enter your email here"
				onChangeText={(text) => setEmail(text)}
			/>
			{/* password field */}
			<InputField
				label="Password"
				placeholder="Type password here"
				IconFamily={Feather}
				icon={iconName}
				securedText={securedText}
				onChange={handleVisibilityChange}
				onChangeText={(text) => setPassword(text)}
			/>
			{/* login button */}
			<CustomButton buttonText="Sign In" onPress={handleSubmit} />
			{/* link for switching to sign up screen */}
			<TouchableOpacity
				style={styles.linkContainer}
				onPress={() => navigation.navigate("Sign Up")}
			>
				<Text style={styles.linkText}>Switch to Sign Up</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default SignInForm;

const styles = StyleSheet.create({
	headline: {
		fontSize: 25,
		letterSpacing: 0.3,
		fontFamily: "specialBold",
		margin: 10,
		paddingHorizontal: 10,
	},
	linkText: {
		fontSize: 16,
		color: "dodgerblue",
	},
	linkContainer: {
		alignItems: "center",
	},
});
