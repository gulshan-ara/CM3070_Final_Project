// Import libraries
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Entypo } from "@expo/vector-icons";

/** This component handles the rendering of header buttons used in different screens */
const HeaderTabButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Entypo}
			iconSize={23}
			color={props.color}
		/>
	);
};

export default HeaderTabButton;

const styles = StyleSheet.create({});
