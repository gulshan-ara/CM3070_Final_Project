import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import InputField from "./InputField";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import { registerNewUser } from "../../utils/authHandler";

const SignUpForm = () => {
	const [securedText, setSecuredText] = useState(false);
	const [iconName, setIconName] = useState("eye-off");
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmedPassword, setConfirmedPassword] = useState(null);
	const [readyToSubmit, setReadyToSubmit] = useState(false);

	const handleVisibilityChange = () => {
		setSecuredText(!securedText);
		if (securedText === false) {
			setIconName("eye");
		} else {
			setIconName("eye-off");
		}
	};

	const handleSubmit = () => {
		if(name !== null && email !== null && password !== null && password === confirmedPassword){
			console.log("submitted");
			registerNewUser(email, password);
		}else{
			console.log("try again");
		}
	}

	return (
		<ScrollView>
			<Text style={styles.headline}>Create a new account</Text>
			<InputField
				label="Name"
				placeholder="Enter your name here"
				onChangeText={(text) => setName(text)}
			/>
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
			<InputField
				label="Confirm Password"
				placeholder="Retype password here"
				securedText={true}
				onChangeText={(text) => setConfirmedPassword(text)}
			/>
			<CustomButton buttonText="Sign Up" onPress={handleSubmit}/>
		</ScrollView>
	);
};

export default SignUpForm;

const styles = StyleSheet.create({
	headline: {
		fontSize: 25,
		letterSpacing: 0.3,
		fontFamily: "specialBold",
		margin: 10,
		paddingHorizontal: 10,
	},
});
