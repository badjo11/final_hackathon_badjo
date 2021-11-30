import axios from "axios";
import React, { useReducer } from "react";
import { APIhistory } from "../const/config";

export const historyContext = React.createContext();

const INIT_STATE = {
  history: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_HISTORY":
      return { ...state, history: action.payload };
    default:
      return state;
  }
};

const HistoryContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! CREATE

  const addHistory = async (ownerMail, cart, date) => {
    try {
      let history = {
        ownerMail,
        cart,
        date,
      };
      const response = await axios.post(APIhistory, history);
      getHistory(ownerMail);
    } catch (e) {
      console.log(e);
    }
  };

  // ! READ

  const getHistory = async (ownerMail) => {
    try {
      const response = await axios(APIhistory + "?ownerMail=" + ownerMail);
      let action = {
        type: "GET_HISTORY",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <historyContext.Provider
      value={{
        addHistory: addHistory,
        getHistory: getHistory,
        history: state.history,
      }}
    >
      {props.children}
    </historyContext.Provider>
  );
};

export default HistoryContextProvider;
