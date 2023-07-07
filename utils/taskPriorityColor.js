/** Function to return a color based on priority of a task.
 * Here priority is provided as parameter.
 */
export const taskColor = (priority) => {
	if (priority === "High") {
		return "rgba(255, 0, 0, 0.5)";
	} else if (priority === "Low") {
		return "rgba(30, 144, 255, 0.5)";
	} else if (priority === "Special") {
		return "rgba(0, 128, 0, 0.5)";
	} else {
		return "rgba(255, 215, 0, 0.5)";
	}
};
