/** In this file all code related to stack & tab navigation will be written. This excludes
 * navigation related to authentication.
 */

/** Here react-navigation will be used for handling the navigation. */

// Import necessary packages & libraries.
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

// import functions, components & files from this project
import HomeScreen from "../screens/HomeScreen";
import NewTask from "../screens/NewTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import EditTaskScreen from "../screens/EditTaskScreen";

// creating the stack
const Stack = createStackNavigator();

// creating the component & adding screens in the stack
const MainNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="I-do" options={""} component={HomeScreen} />
			<Stack.Screen name="New Task" component={NewTask} />
			<Stack.Screen name="Edit Task" component={EditTaskScreen} />
			<Stack.Screen name="Task Details" component={TaskDetailsScreen} />
		</Stack.Navigator>
	);
};

// exporting the function for further usage
export default MainNavigator;
