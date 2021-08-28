import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fectDataBoard } from "../store/action";

const GamePlay = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(fectDataBoard());
  }, []);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(board)}</Text>
      {!board && (
        <View style={styles.board}>
          {board.map((i, row) => (
            <View
              style={
                row === 2 || row === 5
                  ? styles.blockRow
                  : row === 8
                  ? styles.bottom
                  : styles.row
              }
              key={row}
            >
              {i.map((number, cellIndex) => (
                <View
                  style={
                    cellIndex === 2 || cellIndex === 5
                      ? styles.blockCell
                      : cellIndex === 8
                      ? styles.rightCell
                      : styles.cell
                  }
                  key={cellIndex}
                >
                  {number !== 0 ? (
                    <TextInput
                      style={styles.text}
                      maxLength={1}
                      defaultValue={`${number}`}
                      editable={false}
                    ></TextInput>
                  ) : (
                    <TextInput
                      color="red"
                      style={styles.answerText}
                      keyboardType="number-pad"
                      // onChangeText={(answer) =>
                      //   handleOnChange(answer, row, cellIndex)
                      // }
                      maxLength={1}
                    ></TextInput>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default GamePlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#2ec4b6",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  flexButton: {
    flexDirection: "row",
    marginVertical: 20,
  },

  buttonFinish: {
    width: 150,
    padding: 15,
    backgroundColor: "#9a031e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  board: {
    borderColor: "white",
    borderWidth: 4,
    marginTop: 30,
  },

  row: {
    borderColor: "white",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
  },

  blockRow: {
    borderColor: "white",
    borderBottomWidth: 4,
    display: "flex",
    flexDirection: "row",
  },

  bottom: {
    display: "flex",
    flexDirection: "row",
    borderColor: "white",
  },

  cell: {
    borderRightWidth: 1,
    height: 30,
    width: 30,
    borderColor: "white",
  },

  blockCell: {
    borderRightWidth: 4,
    height: 30,
    width: 30,
    borderColor: "white",
  },

  rightCell: {
    height: 30,
    width: 30,
    borderColor: "white",
  },

  text: {
    textAlign: "center",
    marginTop: 7,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 0,
  },

  answerText: {
    textAlign: "center",
    marginTop: 7,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 0,
    color: "red",
  },
});
