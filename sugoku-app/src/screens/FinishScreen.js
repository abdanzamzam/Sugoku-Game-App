import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { newGame } from "../store/action";

const FinishScreen = ({ navigation, route }) => {
  const params = route.params;
  const dispatch = useDispatch();
  const { name, result } = params;

  function handleOnPress() {
    dispatch(newGame());
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horraaaayyy!! </Text>
      {result === "solved" ? (
        <Text style={styles.text}>
          Congratulations {name} with {result} game!
        </Text>
      ) : (
        <Text style={styles.text}>
          Sorry... {name} the game is still {result} :(
        </Text>
      )}
      <TouchableOpacity style={styles.buttonFinish} onPress={handleOnPress}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Play Again!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  row: {
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
  },

  title: {
    textAlign: "center",
    marginTop: 7,
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    marginTop: 7,
    fontSize: 20,
    color: "black",
    paddingHorizontal: 25,
  },

  buttonFinish: {
    width: 150,
    padding: 15,
    backgroundColor: "orange",
    borderRadius: 20,
    textAlign: "center",
    marginTop: 30,
  },
});
