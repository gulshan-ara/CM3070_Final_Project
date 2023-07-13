import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

const CustomAlert = ({ isVisible, alertTitle, confirmText, confirm, cancel}) => {
	const deleteAlert = confirmText === "Delete";
	const confirmButtonColor = deleteAlert
		? "rgba(128, 128, 128, 0.7)"
		: "rgba(255,127,80, 0.9)";
	const cancelButtonColor = deleteAlert
		? "rgba(255,127,80, 0.9)"
		: "rgba(128, 128, 128, 0.7)";

	return (
		<>
			<AwesomeAlert
				show={isVisible}
				title={alertTitle}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showCancelButton={true}
				showConfirmButton={true}
				cancelText="Cancel"
				confirmText={confirmText}
				confirmButtonColor={confirmButtonColor}
				cancelButtonColor={cancelButtonColor}
        onCancelPressed={() => {
					cancel(false);
				}}
        onConfirmPressed={() => {
          confirm();
					cancel(false);
				}}
				onDismiss={() => {
					cancel(false);
				}}
			/>
		</>
	);
};

export default CustomAlert;

const styles = StyleSheet.create({});
