import React, { useEffect, useReducer } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { APIusers } from "../const/config";
import axios from "axios";

export const authContext = React.createContext();
const INIT_STATE = {
  googleUser: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, googleUser: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // AUTH with google
  const googleProvider = new GoogleAuthProvider();
  const authWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      signUpUser(auth.currentUser.displayName, auth.currentUser.email);
      localStorage.setItem("user", JSON.stringify(auth));
    } catch (e) {
      console.log(e);
    }
  };
  const signUpUser = async (username, email) => {
    try {
      let res = await axios(APIusers);
      let user = res.data.find((user) => user.email === email);
      if (user === undefined) {
        try {
          let { data } = await axios.post(APIusers, {
            username,
            email,
          });
          dispatch({
            type: "LOGIN_USER",
            payload: data,
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  //! проверка на то что пользователь в системе или нет
  useEffect(() => {
    onAuthStateChanged(auth, (googleUser) => {
      dispatch({
        type: "SET_USER",
        payload: googleUser,
      });
    });
  }, []);
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <authContext.Provider
      value={{
        authWithGoogle,
        logOut,
        signUpUser,
        googleUser: state.googleUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
