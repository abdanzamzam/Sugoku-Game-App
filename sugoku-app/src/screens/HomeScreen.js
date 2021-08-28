import React, { useState } from "react";
import logo from "../../assets/sudoku.png";
import { StyleSheet, View, Text, Image, TextInput, Picker } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const [level, setLevel] = useState("easy");
  const [name, setName] = useState("");

  function handleOnPress() {
    name
      ? navigation.navigate("Game", {
          level,
          name,
        })
      : alert("please insert username!");
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 100, height: 100 }} />
      <Text style={styles.title}>Let's go...</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(name) => setName(name)}
        placeholder="Input your name"
      />
      <Text style={styles.label}>Select level:</Text>
      <View style={{ marginBottom: 25 }}>
        <View
          style={{
            borderWidth: 2,
            width: 250,
            borderRadius: 50,
            borderColor: "gray",
            minHeight: 50,
            paddingLeft: 10,
            paddingRight: 20,
          }}
        >
          <Picker
            selectedValue={level}
            style={styles.picker}
            onValueChange={(itemValue) => setLevel(itemValue)}
          >
            <Picker.Item label="Level Easy" value="easy" />
            <Picker.Item label="Level Medium" value="medium" />
            <Picker.Item label="Level Hard" value="hard" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={styles.button}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //     backgroundColor: "#2ec4b6",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 50,
    fontWeight: "bold",
    textAlign: "center",
    minHeight: 50,
    padding: 5,
    width: 250,
    fontSize: 18,
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 50,
  },
  label: {
    color: "black",
    fontSize: 18,
    marginBottom: 4,
  },
  picker: {
    height: 50,
    width: 230,
    textAlign: "center",
    borderWidth: 2,
    color: "gray",
  },
  button: {
    backgroundColor: "orange",
    width: 250,
    paddingVertical: 10,
    marginTop: 10,
    opacity: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 24,
    justifyContent: "center",
  },
});
