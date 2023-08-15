import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const WelcomeScreen = () => {
  const [isDark, setIsDark] = useState(false);

	return (
		<View style={isDark ? styles.darkContainer : styles.container}>
			<View style={styles.logoContainer}>
				<Text style={styles.logo}>i-do</Text>
			</View>
			<View style={{ ...styles.logoContainer, marginHorizontal: 15 }}>
				<Text style={styles.normalHeading}>Your personal</Text>
				<Text style={{...styles.normalHeading, ...styles.boldHeading}}>TASK MANAGER</Text>
				<Text style={styles.normalHeading}>with HairCare routine!!</Text>
			</View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>SignUp/Login</Text>
      </TouchableOpacity>
		</View>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  darkContainer: {
		backgroundColor: "#000",
    height: '100%',
    paddingTop: 30,
    paddingHorizontal: 10
	},
	container: {
		marginTop: 30,
		marginHorizontal: 10,
    height: '100%'
	},
	logo: {
		fontSize: 90,
		letterSpacing: 0.5,
		fontFamily: "customBold",
    // color: '#fff'
	},
	logoContainer: {
		marginTop: 50,
		marginHorizontal: 20,
	},
  normalHeading: {
    fontSize: 30,
    fontWeight: '400',
    letterSpacing: 0.3,
    // color: '#fff'
  },
  boldHeading: {
    fontFamily: "specialBold",
    fontSize: 30,
    letterSpacing: 0.7
  },
  buttonContainer: {
    marginTop: 150,
    alignItems: 'center',
    borderWidth: 1,
    width: '50%',
    marginHorizontal: '25%',
    height: 40,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3
  }
});
