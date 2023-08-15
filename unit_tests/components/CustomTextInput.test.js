/** This files contains unit tests for the custom text input component */

// import libraries
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

// import component file
import CustomTextInput from "../../components/CustomTextInput";

/** unit test - 1
 *  The purpose of this unit test is to check whether the component is rendered properly or not.
 */
describe("CustomTextInput", () => {
	it('render correctly text input component', () => {  
		const TextInputComponent = render(<CustomTextInput />).toJSON();
		expect(TextInputComponent).toMatchSnapshot();
	});

	it("renders CustomTextInput correctly", () => {
		// mocking the onChangeText function
		const onChangeText = jest.fn();
		// dummy values to pass as props
		const textInputValue = "Text Input Value";
		const textInputLabel = "Text Input Label";

		// rendering the component
		const { getByText, getByPlaceholderText } = render(
			<CustomTextInput
				onChangeText={onChangeText}
				value={textInputValue}
				label={textInputLabel}
			/>
		);

		// Assertions of successful render of the text input label
		const labelTest = getByText(`${textInputLabel} :`);
		expect(labelTest).toBeTruthy();

		// Assertions of successful render of the text input placeholder
		const placeHolderTextTest = getByPlaceholderText(`Type here`);
		expect(placeHolderTextTest).toBeTruthy();
	});

	/** unit test - 2
	 *  The purpose of this unit test is to check whether the component functions properly onChange text or not.
	 */
	it("fires onChangeText when text is typed", () => {
		// mocking the onChangeText function
		const onChangeText = jest.fn();

		// rendering the custom text input component
		const { getByPlaceholderText } = render(
			<CustomTextInput onChangeText={onChangeText} value="" label="" />
		);

		// storing the placeholder text in a variable
		const placeHolderText = getByPlaceholderText("Type here");

		// making an event where text is changed on the input field
		fireEvent.changeText(
			placeHolderText,
			"Changed Text after completing the event"
		);

		// Assertion of calling the mock function the typed text on text input field
		expect(onChangeText).toHaveBeenCalledWith(
			"Changed Text after completing the event"
		);
	});
});
