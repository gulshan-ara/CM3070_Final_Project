// import libraries
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { AntDesign } from "@expo/vector-icons";

/** This is a custom component handling the display of the optionList.
 * Here, optiondata is the list of options passed as parameter for reusing this function.
 * onChangeSelection handles the user input
 * selectedOption determines the initial value
 */
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
				if (item.text === selectedOption) {
					iconName = "checkcircle";
				}
				// rendering the option item view
				return (
					<TouchableOpacity
						key={item.text}
						style={styles.listItem}
						onPress={() => onChangeSelection(item.text)}
					>
						<AntDesign
							name={iconName}
							size={15}
							color="black"
							style={styles.icon}
						/>
						<Text style={styles.itemText}>{item.text}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

/** CustomModal component recieves necessary datas to render an alert with specific informations
 * as parameter,
 * showAlert triggers when to show the Alert,
 * closeAlert triggers when to hide the Alert,
 * title & confirmText is used to render different texts in different places,
 * optionData handles the options list,
 * value & onChange handles the user selection
 */
const CustomModal = ({
	showAlert,
	closeAlert,
	title,
	confirmText,
	value,
	onChange,
	optionData,
}) => {
	// state variable to handle user selection
	const [selectedOption, setSelectedOption] = useState(value);

	// rendering the Alert using AwesomeAlert module of react native
	return (
		<>
			<AwesomeAlert
				show={showAlert}
				title={title}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showCancelButton={true}
				showConfirmButton={true}
				cancelText="Cancel"
				confirmText={confirmText}
				confirmButtonColor="dodgerblue"
				cancelButtonColor="grey"
				titleStyle={{ letterSpacing: 0.3 }}
				onCancelPressed={() => {
					closeAlert(false);
				}}
				onConfirmPressed={() => {
					onChange(selectedOption);
					closeAlert(false);
				}}
				onDismiss={() => {
					closeAlert(false);
				}}
				customView={
					<CustomOptionsView
						optionData={optionData}
						selectedOption={selectedOption}
						onChangeSelection={setSelectedOption}
					/>
				}
			/>
		</>
	);
};

export default CustomModal;

const styles = StyleSheet.create({
	listContainer: {
		alignItems: "flex-start",
	},
	listItem: {
		width: 250,
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
});
