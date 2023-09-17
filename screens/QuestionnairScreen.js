// Import necessary libraries and packages
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import { addHairRefForUser } from "../utils/databaseHelper";

// Hair quiz object
const quizObject = {
	"Scalp Type": ["Oily", "Dry", "Normal"],
	"Hair Type": ["Straight", "Wavy", "Curly", "Coily"],
	"Hair Density": ["Thin", "Thick", "Medium"],
	"Hair Porosity": ["Low", "High", "Normal"],
	"Hair Elasticity": ["Low", "High", "Normal"],
};

// Custom radio buttons to present the options of question
const CustomOptionsView = ({
	optionData,
	onChangeSelection,
	selectedOption,
}) => {
	return (
		// rendering the container view
		<View style={styles.listContainer}>
			{/* Looping over the options array */}
			{optionData.map((item) => {
				// determining icon based on user input
				let iconName = "checkcircleo";
				if (item === selectedOption) {
					iconName = "checkcircle";
				}
				// rendering the option item view
				return (
					<TouchableOpacity
						key={item}
						style={styles.listItem}
						onPress={() => onChangeSelection(item)}
					>
						<AntDesign
							name={iconName}
							size={15}
							color="black"
							style={styles.icon}
						/>
						<Text style={styles.itemText}>{item}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const QuestionnairScreen = () => {
	// state variables to store values
	const [scalpType, setScalpType] = useState("Normal");
	const [hairType, setHairType] = useState("Straight");
	const [hairDensity, setHairDensity] = useState("Medium");
	const [hairPorosity, setHairPorosity] = useState("Normal");
	const [hairElasticity, setHairElasticity] = useState("Normal");
	const userId = useSelector((state) => state.user.userId);

	// onPress action of submit button
	const handleSubmit = async () => {
		// defining wash day interval based on scalp type
		let interval;
		if (scalpType === "Oily") {
			interval = 3;
		} else if (scalpType === "Dry") {
			interval = 5;
		} else {
			interval = 4;
		}

		// defining hair task list based on hair type
		let hairTaskSet;
		if (hairType === "Straight" || hairType === "Wavy") {
			hairTaskSet = "NonCurly";
		} else {
			hairTaskSet = "Curly";
		}

		// assorting all info in an object with creation date & visibility
		const hairObject = {
			scalpType,
			hairType,
			hairDensity,
			hairPorosity,
			hairElasticity,
			interval,
			hairTaskSet,
			creationDate: new Date().toDateString(),
			isShown: true,
		};

		// adding the hair object in database
		try {
			await addHairRefForUser(userId, hairObject);
		} catch (error) {
			Alert.alert(error);
		}
	};

	// rendering main UI
	return (
		<ScrollView style={styles.container}>
			{/* Question view with a question & options */}
			<View style={styles.questionBox}>
				<Text style={styles.qText}>What's your Scalp Type ?</Text>
				<CustomOptionsView
					optionData={quizObject["Scalp Type"]}
					selectedOption={scalpType}
					onChangeSelection={setScalpType}
				/>
			</View>
			{/* Question view with a question & options */}
			<View style={styles.questionBox}>
				<Text style={styles.qText}>What's your Hair Type ?</Text>
				<CustomOptionsView
					optionData={quizObject["Hair Type"]}
					selectedOption={hairType}
					onChangeSelection={setHairType}
				/>
			</View>
			{/* Question view with a question & options */}
			<View style={styles.questionBox}>
				<Text style={styles.qText}>What's your Hair Density ?</Text>
				<CustomOptionsView
					optionData={quizObject["Hair Density"]}
					selectedOption={hairDensity}
					onChangeSelection={setHairDensity}
				/>
			</View>
			{/* Question view with a question & options */}
			<View style={styles.questionBox}>
				<Text style={styles.qText}>What's your Hair Porosity ?</Text>
				<CustomOptionsView
					optionData={quizObject["Hair Porosity"]}
					selectedOption={hairPorosity}
					onChangeSelection={setHairPorosity}
				/>
			</View>
			{/* Question view with a question & options */}
			<View style={styles.questionBox}>
				<Text style={styles.qText}>What's your Hair Elasticity ?</Text>
				<CustomOptionsView
					optionData={quizObject["Hair Elasticity"]}
					selectedOption={hairElasticity}
					onChangeSelection={setHairElasticity}
				/>
			</View>
			{/* Submit button */}
			<CustomButton
				buttonText="Generate Routine"
				onPress={handleSubmit}
				buttonStyle={styles.button}
			/>
		</ScrollView>
	);
};

export default QuestionnairScreen;

const styles = StyleSheet.create({
	listContainer: {
		alignItems: "flex-start",
	},
	listItem: {
		flexDirection: "row",
		marginVertical: 5,
	},
	icon: {
		marginHorizontal: 10,
		marginVertical: 5,
	},
	itemText: {
		fontSize: 16,
		letterSpacing: 0.3,
	},
	questionBox: {
		marginVertical: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginHorizontal: 10,
		backgroundColor: "rgba(255, 228, 181, 0.7)",
		borderRadius: 20,
	},
	qText: {
		fontSize: 17,
		letterSpacing: 0.5,
		fontWeight: "800",
	},
	container: {
		backgroundColor: "beige",
		height: "100%",
	},
	button: {
		width: "60%",
		marginHorizontal: "20%",
	},
});
