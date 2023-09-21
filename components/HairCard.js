import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// Component to render the hair care task card
const HairCard = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.cardContainer} onPress={onPress}>
			<Text style={styles.cardText}>View HairCare Tasks</Text>
		</TouchableOpacity>
	);
};

export default HairCard;

const styles = StyleSheet.create({
	cardContainer: {
		marginHorizontal: 10,
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "rgba(60, 179, 113, 0.3)",
	},
	cardText: {
		fontSize: 18,
		fontWeight: "bold",
		letterSpacing: 0.5,
		textAlign: "center",
	},
});
