import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { AntDesign } from "@expo/vector-icons";

const CustomOptionsView = ({
	optionData,
	onChangeSelection,
	selectedOption,
}) => {
	return (
		<View style={styles.listContainer}>
			{optionData.map((item) => {
				let iconName = "checkcircleo";
				if (item.text === selectedOption) {
					iconName = "checkcircle";
				}
				return (
					<TouchableOpacity
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

const CustomModal = ({
	showAlert,
	closeAlert,
	title,
	confirmText,
	value,
	onChange,
	optionData,
}) => {
	const [selectedOption, setSelectedOption] = useState(value);

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
