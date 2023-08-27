/** This file will handle the whole app navigation related code. Few decisions will be taken
 * here to decide which screen to take.
 * if User is a new user, Authentication related screens will be shown.
 * if the User is an existing one but not logged in, Login screen will be rendered.
 * If User is an existing one and logged in to the app, The main screens of app will be rendered with respective data.
 */

// import necessary libraries
import { NavigationContainer } from "@react-navigation/native";

// import functions & files from this project
import MainNavigator from "./MainNavigator";

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
	); 
};

export default AppNavigator;
