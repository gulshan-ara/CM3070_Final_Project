import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";

const InputField = ({
	label,
	placeholder,
	initialValue,
	icon,
	IconFamily,
	securedText,
  onChange,
	onChangeText
}) => {
	return (
		<View style={styles.inputFieldContainer}>
			<Text style={styles.inputLabel}>{label} : </Text>
			<View style={styles.inputBox}>
				<TextInput
					style={styles.textInput}
					placeholder={placeholder}
					value={initialValue}
					secureTextEntry={securedText}
          onChangeText={onChangeText}
				/>
				{icon && (
					<TouchableOpacity style={styles.optionalIcon} onPress={onChange}>
						<IconFamily name={icon} size={20} color="black" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default InputField;

const styles = StyleSheet.create({
	inputFieldContainer: {
		marginHorizontal: 10,
		padding: 10,
	},
	inputLabel: {
		fontSize: 18,
		letterSpacing: 0.3,
		fontWeight: "700",
	},
	inputBox: {
		borderWidth: 1,
		marginTop: 5,
		height: 40,
		flexDirection: "row",
	},
	textInput: {
		flex: 8,
		paddingHorizontal: 20,
		fontSize: 16,
		letterSpacing: 0.3,
	},
	optionalIcon: {
		flex: 1,
		paddingVertical: 8,
		paddingLeft: 10,
	},
});
