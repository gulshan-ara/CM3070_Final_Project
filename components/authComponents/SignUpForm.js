import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputField from "./InputField";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../CustomButton";

const SignUpForm = () => {
	const [securedText, setSecuredText] = useState(false);
	const [iconName, setIconName] = useState("eye-off");

	const handleVisibilityChange = () => {
		setSecuredText(!securedText);
    if(securedText === false){
      setIconName("eye");
    }else{
      setIconName("eye-off");
    }
	};

	return (
		<ScrollView>
			<Text style={styles.headline}>Create a new account</Text>
			<InputField label="Name" placeholder="Enter your name here" />
			<InputField label="Email" placeholder="Enter your email here" />
			<InputField
				label="Password"
				placeholder="Type password here"
				IconFamily={Feather}
				icon={iconName}
				securedText={securedText}
        onChange={handleVisibilityChange}
			/>
			<InputField
				label="Confirm Password"
				placeholder="Retype password here"
				securedText={true}
			/>
      <CustomButton buttonText="Sign Up"/>
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
