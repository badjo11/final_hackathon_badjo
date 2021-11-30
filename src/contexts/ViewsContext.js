import axios from "axios";
import React, { useReducer } from "react";
import { APIviews } from "../const/config";

export const viewsContext = React.createContext();

const INIT_STATE = {
  views: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_VIEWS":
      return { ...state, views: action.payload };
    case "CLEAR_STATE":
      return { ...state, phone: action.payload };
    default:
      return state;
  }
};

const ViewsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! CREATE

  const addViews = async (ownerMail, product) => {
    try {
      if (!product.id) {
      } else {
        const { data } = await axios(APIviews + "?ownerMail=" + ownerMail);
        let res = data.filter((item) => {
          return item.product.id === product.id;
        });
        if (res.length === 0) {
          let views = {
            ownerMail,
            product,
          };
          const response = await axios.post(APIviews, views);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // ! READ

  const getViews = async (ownerMail) => {
    try {
      const response = await axios(APIviews + "?ownerMail=" + ownerMail);
      let action = {
        type: "GET_VIEWS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  const clearState = () => {
    dispatch({
      type: "CLEAR_STATE",
      payload: null,
    });
  };
  return (
    <viewsContext.Provider
      value={{
        addViews: addViews,
        getViews: getViews,
        clearState,
        views: state.views,
      }}
    >
      {props.children}
    </viewsContext.Provider>
  );
};

export default ViewsContextProvider;
