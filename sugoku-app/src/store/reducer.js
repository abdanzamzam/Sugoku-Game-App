import actionType from "./actionType";

const initialState = {
  board: [],
  loading: false,
  result: "unsolved",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.FETCH_DATA_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case actionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionType.SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case actionType.SET_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case actionType.RESET_GAME:
      return {
        ...state,
        board: [],
        result: "unsolved",
      };
    default:
      return state;
  }
}
