import { StatusBar } from "expo-status-bar";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import WelcomeScreen from "./screens/WelcomeScreen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsLoaded, setAppIsLoaded] = useState(false);

	useEffect(() => {
		const prepare = async () => {
			try {
				await Font.loadAsync({
					"customBold": require("./assets/fonts/DancingScript-Bold.ttf"),
					"customSemiBold": require("./assets/fonts/DancingScript-SemiBold.ttf"),
					"customMedium": require("./assets/fonts/DancingScript-Medium.ttf"),
					"customRegular": require("./assets/fonts/DancingScript-Regular.ttf"),
				});
			} catch (error) {
				console.error(error);
			} finally {
				setAppIsLoaded(true);
			}
		};

		prepare();
	}, []);

	const onLayout = useCallback(async () => {
		if (appIsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [appIsLoaded]);

	if (!appIsLoaded) {
		return null;
	}

	return (
		// <AppNavigator />
		<View onLayout={onLayout}>
			<WelcomeScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
