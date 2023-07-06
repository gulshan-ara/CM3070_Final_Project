/** In this file all code related to stack & tab navigation will be written. This excludes
 * navigation related to authentication.
 */

/** Here react-navigation will be used for handling the navigation. */

// Import necessary packages & libraries.
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import functions, components & files from this project
import HomeScreen from "../screens/HomeScreen";
import NewTask from "../screens/NewTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderTabButton from "../components/HeaderTabButton";

// creating the stack
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{headerShadowVisible: false}}
		>
			<Tab.Screen
				name="I-do"
				component={HomeScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Feather
								name="home"
								size={24}
								color="black"
							/>
						);
					},
					headerRight: () => {
						return (
							<HeaderButtons HeaderButtonComponent={HeaderTabButton}>
								<Item
									title="New Task"
									iconName="new-message"
									onPress={() => navigation.navigate("New Task")}
								/>
							</HeaderButtons>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={NewTask}
				options={{
					tabBarIcon: () => {
						return (
							<AntDesign
								name="profile"
								size={24}
								color="black"
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={NewTask}
				options={{
					tabBarIcon: () => {
						return (
							<Feather
								name="search"
								size={24}
								color="black"
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Search"
				component={NewTask}
				options={{
					tabBarIcon: () => {
						return (
							<Feather
								name="settings"
								size={24}
								color="black"
							/>
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
			<Stack.Screen name="I-do" options={{ headerShown: false }} component={TabNavigator} />
			<Stack.Screen name="New Task" component={NewTask} />
			<Stack.Screen name="Edit Task" component={EditTaskScreen} />
			<Stack.Screen name="Task Details" component={TaskDetailsScreen} />
		</Stack.Navigator>
	);
};

// exporting the function for further usage
export default MainNavigator;
