import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import SignUpForm from "../components/authComponents/SignUpForm";
import SignInForm from "../components/authComponents/SignInForm";

const AuthScreen = () => {
	const [isSignedUp, setIsSignedUp] = useState(false);
	return (
		<ScrollView>
			{isSignedUp ? <SignInForm /> : <SignUpForm />}
			<TouchableOpacity
				style={styles.linkContainer}
				onPress={() => setIsSignedUp(!isSignedUp)}
			>
				<Text style={styles.linkText}>
					Switch to {isSignedUp ? "Sign Up" : "Login"}
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default AuthScreen;

const styles = StyleSheet.create({
	linkText: {
		fontSize: 16,
		color: "dodgerblue",
	},
	linkContainer: {
		alignItems: "center",
	},
});
