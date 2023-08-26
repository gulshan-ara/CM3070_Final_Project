import { StatusBar } from "expo-status-bar";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./redux_store/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsLoaded, setAppIsLoaded] = useState(false);

	useEffect(() => {
		const prepare = async () => {
			try {
				await Font.loadAsync({
					customBold: require("./assets/fonts/DancingScript-Bold.ttf"),
					customSemiBold: require("./assets/fonts/DancingScript-SemiBold.ttf"),
					customMedium: require("./assets/fonts/DancingScript-Medium.ttf"),
					customRegular: require("./assets/fonts/DancingScript-Regular.ttf"),
					specialBold: require("./assets/fonts/RubikWetPaint-Regular.ttf"),
				});
			} catch (error) {
				console.error(error);
			} finally {
				console.log("loaded");
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
		<Provider store={store}>
			<SafeAreaProvider onLayout={onLayout}>
				<AppNavigator />
			</SafeAreaProvider>
		</Provider>
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
