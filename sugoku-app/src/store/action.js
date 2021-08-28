import actionType from "./actionType";

const setBoard = (data) => {
  return {
    type: actionType.FETCH_DATA_BOARD,
    payload: data,
  };
};

const setLoading = (data) => {
  return {
    type: actionType.SET_LOADING,
    payload: data,
  };
};

export const fectDataBoard = (level) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(setBoard(response.board));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const setBoardInput = (board) => {
  return {
    type: actionType.SET_BOARD,
    payload: board,
  };
};

const setResult = (data) => {
  return {
    type: actionType.SET_RESULT,
    payload: data,
  };
};

export const solveBoard = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(setBoard(response.solution));
        dispatch(setResult(response.status));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const validateBoard = (board) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: board,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        console.log(response.status);
        dispatch(setResult(response.status));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const newGame = () => {
  return {
    type: actionType.RESET_GAME,
  };
};
