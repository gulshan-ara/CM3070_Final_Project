import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import InputField from "./InputField";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import { signInExistingUser } from "../../utils/authHandler";

const SignInForm = () => {
	const [securedText, setSecuredText] = useState(false);
	const [iconName, setIconName] = useState("eye-off");
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const handleVisibilityChange = () => {
		setSecuredText(!securedText);
		if (securedText === false) {
			setIconName("eye");
		} else {
			setIconName("eye-off");
		}
	};

	const handleSubmit = () => {
		if (email !== null && password !== null) {
			signInExistingUser(email, password);
      console.log("Logged In");
		} else {
			console.log("try again");
		}
	};

	return (
		<ScrollView>
			<Text style={styles.headline}>Sign in to an account</Text>
			<InputField
				label="Email"
				placeholder="Enter your email here"
				onChangeText={(text) => setEmail(text)}
			/>
			<InputField
				label="Password"
				placeholder="Type password here"
				IconFamily={Feather}
				icon={iconName}
				securedText={securedText}
				onChange={handleVisibilityChange}
				onChangeText={(text) => setPassword(text)}
			/>
			<CustomButton buttonText="Sign In" onPress={handleSubmit} />
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
});
