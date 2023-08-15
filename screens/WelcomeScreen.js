import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const WelcomeScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
        <Text style={styles.logo}>i-do</Text>
			</View>
		</View>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
	},
  logo: {
    fontSize: 90,
    letterSpacing: 0.5,
    fontFamily: "customBold"
  },
  logoContainer: {
    marginVertical: 250,
    alignItems: 'center',
  }
});
