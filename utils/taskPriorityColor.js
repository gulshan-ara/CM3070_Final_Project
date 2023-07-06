/** Function to return a color based on priority of a task.
 * Here priority is provided as parameter.
 */
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
