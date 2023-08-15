/** This files contains unit tests for the custom text input component */

// import libraries
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

// import component file
import CustomDatePicker from "../../components/CustomDatePicker";

/** unit test - 1
 *  The purpose of this unit test is to check whether the component is rendered properly or not.
 */

describe("CustomDatePicker", () => {
	it('render correctly datepicker component', () => {  
		const DatePickerComponent = render(<CustomDatePicker />).toJSON();
		expect(DatePickerComponent).toMatchSnapshot();
	});

	it("renders CustomDatePicker correctly", () => {
		// dummy values to pass as props
		const datePickerLabel = "datepicker label";
		// rendering the component
		const { getByText } = render(
			<CustomDatePicker label={datePickerLabel} />
		);
		// Assertions of successful render of the datepicker input label
		const labelTest = getByText(`${datePickerLabel} :`);
		expect(labelTest).toBeTruthy();
	});

});
