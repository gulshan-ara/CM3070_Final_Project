import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const HairTaskList = () => {
	// fetch hairNode from state
	const hairNode = useSelector((state) => state.user.hairObj);
	// states to store data
	const [currentDate, setCurrentDate] = useState(new Date().toDateString());
	const [intervalModulo, setIntervalModulo] = useState(null);
	const [dayType, setDayType] = useState(null);
	const [hairType, setHairType] = useState(null);
	const [taskList, setTaskList] = useState(null);
	const [count, setCount] = useState(0);

	// setting tasklist based on hair type
	useEffect(() => {
		if (hairNode.hairType === "Straight" || hairNode.hairType === "Wavy") {
			setHairType(straightHairTasks);
		} else {
			setHairType(curlyHairTasks);
		}
	}, [hairNode]);

	// side effect to update date daily
	useEffect(() => {
		// running the effect everyday
		const timeInterval = setInterval(() => {
			setCurrentDate(new Date());
		}, 86400000);
		return () => clearInterval(timeInterval);
	}, []);

	// side effect to update the day difference
	useEffect(() => {
		const creationDate = new Date(hairNode.creationDate).getTime();
		// calculating day difference
		const diff =
			(new Date(currentDate).getTime() - creationDate) / 86400000;
		const interval = hairNode.interval;
		setIntervalModulo(diff % interval);
	}, [currentDate]);

	// side effect to update day type
	useEffect(() => {
		if (hairType !== null) {
			if (intervalModulo === 0) {
				setDayType(Object.keys(hairType)[0]);
			} else {
				setDayType(Object.keys(hairType)[1]);
			}
		} else {
			console.log("Error in hairType");
		}
	}, [intervalModulo, hairType]);

	// updating hair care task list based on day type and hair type
	useEffect(() => {
		if (hairType !== null && dayType !== null) {
			setTaskList(hairType[dayType]);
		}
	}, [hairType, dayType]);

	// task list for straight hair type
	const straightHairTasks = {
		washday: [
			"Apply oil on roots and ends",
			"Shampoo twice",
			"Apply conditioner on length",
			"Dry hair around 80%",
			"Apply leave-in-conditioner",
			"Protective hairstyle once hair is dried",
		],
		nonWashday: [
			"Detangle hair thorougly",
			"Apply growth serum on roots",
			"Massage scalp for 5 minutes",
			"Apply 2/3 drops of oil on ends",
			"Brush hair & wear protective hairstyle",
		],
	};

	// task list for curly hair type
	const curlyHairTasks = {
		washday: [
			"Detangle hair well",
			"Apply oil on roots and ends",
			"Shampoo twice",
			"Apply conditioner on length",
			"Apply styling gels & creams on damp hair",
			"dry hair & scrunch the cast",
		],
		nonWashday: [
			"Apply growth serum on roots",
			"Massage scalp for 5 minutes",
			"Apply 2/3 drops of oil on ends",
			"wear silk bonnets to protect curls",
		],
	};

	return (
		<View style={styles.container}>
			{/* rendering how many tasks is completed */}
			{taskList !== null && (
				<View style={styles.completionView}>
					<Text style={styles.completionText}>
						{count}/{taskList.length} tasks completed!
					</Text>
				</View>
			)}
			{/* rendering the task list */}
			{taskList !== null &&
				taskList.map((item) => {
					return (
						<View key={item} style={styles.taskContainer}>
							{/* completion icon */}
							<TouchableOpacity
								style={styles.icon}
								onPress={() => {
									setCount(count + 1);
									Alert.alert("This task is completed!");
								}}
							>
								<AntDesign
									name="checkcircleo"
									size={18}
									color="black"
								/>
							</TouchableOpacity>
							{/* task text */}
							<Text style={styles.task}>{item}</Text>
						</View>
					);
				})}
		</View>
	);
};

export default HairTaskList;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "beige",
		height: "100%",
	},
	taskContainer: {
		marginHorizontal: 20,
		marginVertical: 5,
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "rgba(60, 179, 113, 0.3)",
		flexDirection: "row",
	},
	task: {
		fontSize: 16,
		fontWeight: "700",
		flex: 3,
	},
	icon: {
		marginHorizontal: 10,
		paddingVertical: 5,
	},
	completionText: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center",
	},
	completionView: {
		marginHorizontal: 20,
		marginVertical: 5,
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
});
