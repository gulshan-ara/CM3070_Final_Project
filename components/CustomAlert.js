// import libraries and packages
import { StyleSheet } from "react-native";
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

const CustomAlert = ({
	isVisible,
	alertTitle,
	confirmText,
	confirm,
	cancel,
}) => {
	//  checking if the alert is used for deleting something or not
	const deleteAlert = confirmText === "Delete";
	// if it's used for delete action, then the prominent color will be used for the cancel option
	const confirmButtonColor = deleteAlert
		? "rgba(128, 128, 128, 0.7)"
		: "rgba(255,127,80, 0.9)";
	const cancelButtonColor = deleteAlert
		? "rgba(255,127,80, 0.9)"
		: "rgba(128, 128, 128, 0.7)";

	//  rendering the alert view by using react native awesome alert library
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
