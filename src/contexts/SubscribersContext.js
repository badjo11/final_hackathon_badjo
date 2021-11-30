import axios from "axios";
import React, { useReducer } from "react";
import { APIsubscribers } from "../const/config";

export const subscribersContext = React.createContext();

const INIT_STATE = {
  subscribers: null,
  checking: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_SUBSCRIBERS":
      return { ...state, subscribers: action.payload };
    case "CHECK_SUBSCRIBE":
      return { ...state, checking: action.payload };
    default:
      return state;
  }
};

const SubscribersContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! CREATE

  const addSubscribers = async (ownerMail, discount) => {
    try {
      let subscribers = {
        ownerMail,
        discount,
      };
      const response = await axios.post(APIsubscribers, subscribers);
      checkSubscribe(ownerMail);
    } catch (e) {
      console.log(e);
    }
  };

  // ! READ

  const getSubscriber = async (email) => {
    try {
      const { data } = await axios(APIsubscribers);
      let fil = data.filter((item) => {
        return item.ownerMail === email;
      });
      let action = {
        type: "GET_SUBSCRIBERS",
        payload: fil[0],
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  const checkSubscribe = async (email) => {
    try {
      const { data } = await axios(APIsubscribers);
      let res = data.filter((item) => {
        return item.ownerMail === email;
      });
      if (res.length !== 0) {
        dispatch({
          type: "CHECK_SUBSCRIBE",
          payload: true,
        });
      } else {
        dispatch({
          type: "CHECK_SUBSCRIBE",
          payload: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteSubscribe = async (email) => {
    try {
      let id;
      const { data } = await axios(APIsubscribers);
      data.forEach((item) => {
        if (item.ownerMail === email) {
          id = item.id;
        }
      });
      await axios.delete(`${APIsubscribers}/${id}`);
      checkSubscribe(email);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <subscribersContext.Provider
      value={{
        addSubscribers: addSubscribers,
        getSubscriber: getSubscriber,
        checkSubscribe,
        deleteSubscribe,
        checking: state.checking,
        subscribers: state.subscribers,
      }}
    >
      {props.children}
    </subscribersContext.Provider>
  );
};

export default SubscribersContextProvider;
