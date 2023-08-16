import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputField = ({icon, iconPack}) => {
	return (
  <View style={styles.inputFieldContainer}>
    <Text style={styles.inputLabel}>Label : </Text>
    <View style={styles.inputBox}>
      <TextInput  style={styles.textInput}/>
      <Text style={styles.optionalIcon}>Icon</Text>
    </View>
  </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputFieldContainer: {
    margin: 10,
    padding: 10
  },
  inputLabel: {
    fontSize: 18,
    letterSpacing: 0.3,
    fontWeight: '700'
  },
  inputBox: {
    borderWidth: 1,
    marginTop: 5,
    height: 40,
    flexDirection: 'row'
  },
  textInput:{
    flex: 8,
    borderRightWidth: 1
  },
  optionalIcon:{
    flex: 1,
  }
});
