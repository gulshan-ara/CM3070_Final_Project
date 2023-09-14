import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { getFirebaseApp } from "../utils/firebaseInit";
import CustomButton from "../components/CustomButton";

// Component to show user name, email & location along with log out button
const AccountSettingsScreen = ({ navigation }) => {
  //  fetching name and email from state
	const userName = useSelector((state) => state.user.userName);
	const userEmail = useSelector((state) => state.user.userEmail);

  // function to handle log out
	const handleSignOut = () => {
		const app = getFirebaseApp();
		const auth = getAuth(app);

		signOut(auth)
			.then(() => {
				navigation.navigate("Sign In");
				console.log("User signed out");
			})
			.catch((error) => {
				Alert.alert(error);
			});
	};

  // main view renderer
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
        <Text style={styles.headingText}>Name : </Text>
				<Text style={styles.text}>{userName}</Text>
			</View>
			<View style={styles.textContainer}>
        <Text style={styles.headingText}>Email : </Text>
				<Text style={styles.text}>{userEmail}</Text>
			</View>
			<CustomButton buttonText="Log Out" onPress={handleSignOut} />
		</View>
	);
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "beige",
		height: "100%",
		paddingHorizontal: 5,
	},
  textContainer: {
    marginHorizontal: 10,
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "rgba(255, 228, 181, 0.7)",
    flexDirection: 'row'
  },
  headingText: {
    fontSize: 18,
		letterSpacing: 0.3,
    flex: 1,
    fontWeight: '600'
  },
  text: {
    fontSize: 18,
		letterSpacing: 0.3,
    flex: 3
  },
});
