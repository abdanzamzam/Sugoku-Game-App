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
import {
  fectDataBoard,
  setBoardInput,
  solveBoard,
  validateBoard,
} from "../store/action";
import loadingGIF from "../../assets/loading.gif";

const GameScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const newBoard = useSelector((state) => state.newBoard);
  const loading = useSelector((state) => state.loading);
  const result = useSelector((state) => state.result);
  const [reload, setReload] = useState(null);

  const params = route.params;
  const { level, name } = params;

  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  function handleOnChange(answer, row, cell) {
    //     setReload(true);
    const tempBoard = [...board];
    tempBoard[row][cell] = +answer;
    dispatch(setBoardInput(tempBoard));
  }

  function handleOnPress() {
    navigation.navigate("Finish", {
      name,
      result,
    });
  }

  function handleAutoSolve() {
    dispatch(solveBoard(board));
  }

  function handleValidate() {
    let data = { board };
    const payload = encodeParams(data);
    dispatch(validateBoard(payload));
  }

  useEffect(() => {
    dispatch(fectDataBoard(level));
  }, []);

  return (
    <View style={styles.container}>
      {!loading && (
        <View>
          {/* <Text>{JSON.stringify(result)}</Text> */}
          {JSON.stringify(result) === "solved" ? (
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Status Game: {result}
            </Text>
          ) : (
            <Text
              style={{
                color: "#d90429",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Status Game: {result}
            </Text>
          )}
        </View>
      )}
      {loading && (
        <View style={{ justifyContent: "center" }}>
          <Image source={loadingGIF} style={{ width: 60, height: 60 }} />
          <Text style={{ marginTop: 15, color: "gray" }}>Loading...</Text>
        </View>
      )}
      {/* Boad */}
      {!loading && (
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
                  {number ? (
                    <View
                      style={{
                        backgroundColor: "yellow",
                        width: 37,
                        height: 40,
                      }}
                    >
                      <TextInput
                        style={styles.text}
                        maxLength={1}
                        defaultValue={`${number}`}
                        editable={false}
                      ></TextInput>
                    </View>
                  ) : (
                    <TextInput
                      color="red"
                      style={styles.answerText}
                      keyboardType="number-pad"
                      onChangeText={(answer) =>
                        handleOnChange(answer, row, cellIndex)
                      }
                      maxLength={1}
                    ></TextInput>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
      {!loading && (
        <View style={styles.flexButton}>
          <TouchableOpacity onPress={handleValidate}>
            <Text style={styles.btnStyle}>VALIDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAutoSolve}>
            <Text style={styles.btnStyle}>AUTO SOLVE</Text>
          </TouchableOpacity>
        </View>
      )}
      {!loading && (
        <TouchableOpacity style={styles.buttonFinish} onPress={handleOnPress}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 25,
            }}
          >
            Finish
          </Text>
        </TouchableOpacity>
      )}
      {/* End Board */}
      {/* {!loading && <Text>{JSON.stringify(board)}</Text>} */}
      {/* {!loading && <Text>---------------------</Text>} */}
      {/* {newBoard.length >= 0 && <Text>{JSON.stringify(newBoard)}</Text>} */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  board: {
    borderColor: "gray",
    borderWidth: 4,
    marginTop: 30,
  },
  blockRow: {
    borderColor: "gray",
    borderBottomWidth: 4,
    display: "flex",
    flexDirection: "row",
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    borderColor: "black",
  },
  row: {
    borderColor: "black",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
  },
  blockCell: {
    borderRightWidth: 4,
    height: 40,
    width: 40,
    borderColor: "gray",
  },
  cell: {
    borderRightWidth: 1,
    height: 40,
    width: 40,
    borderColor: "black",
  },
  text: {
    textAlign: "center",
    flex: 1,
    marginTop: 7,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 0,
  },
  answerText: {
    textAlign: "center",
    flex: 1,
    marginTop: 7,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 0,
    color: "red",
  },
  buttonFinish: {
    width: 250,
    padding: 13,
    backgroundColor: "orange",
    marginTop: 40,
    borderRadius: 50,
  },
  flexButton: {
    flexDirection: "row",
    marginVertical: 20,
  },
  btnStyle: {
    backgroundColor: "green",
    color: "white",
    marginTop: 10,
    padding: 7,
    paddingHorizontal: 20,
    marginHorizontal: 2,
    borderRadius: 10,
  },
});
