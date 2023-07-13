/** In this file all code related to stack & tab navigation will be written. This excludes
 * navigation related to authentication.
 */

/** Here react-navigation will be used for handling the navigation. */

// Import necessary packages & libraries.
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// import functions, components & files from this project
import HomeScreen from "../screens/HomeScreen";
import NewTask from "../screens/NewTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchScreen from "../screens/SearchScreen";

// creating the stack
const Stack = createStackNavigator();
// creating the bottom tab
const Tab = createBottomTabNavigator();

// bottom tab navigator code
const TabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShadowVisible: false }}>
			<Tab.Screen
				name="I-do"
				component={HomeScreen}
				options={{
					tabBarIcon: () => {
						return <Feather name="home" size={24} color="black" />;
					},
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: () => {
						return (
							<AntDesign name="profile" size={24} color="black" />
						);
					},
				}}
			/>
			<Tab.Screen
				name="Search"
				component={SearchScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Feather name="search" size={24} color="black" />
						);
					},
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Feather name="settings" size={24} color="black" />
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

// creating the component & adding screens in the stack
const MainNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="I-do"
				options={{ headerShown: false }}
				component={TabNavigator}
			/>
			<Stack.Screen name="New Task" component={NewTask} />
			<Stack.Screen name="Edit Task" component={EditTaskScreen} />
			<Stack.Screen name="Task Details" component={TaskDetailsScreen} />
		</Stack.Navigator>
	);
};

// exporting the function for further usage
export default MainNavigator;
