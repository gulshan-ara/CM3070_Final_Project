export const taskColor = (priority) => {
	if (priority === "High") {
		return "red";
	} else if (priority === "Low") {
		return "dodgerblue";
	} else if (priority === "Special") {
		return "green";
	} else {
		return "gold";
	}
};
