import React, { useReducer } from "react";
import { APIchats, APIusers } from "../const/config";
import axios from "axios";

export const chatsContext = React.createContext();
const INIT_STATE = {
  chats: [],
  chatToEdit: null,
  user: null,
  users: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CHATS_FOR_ROOM":
      return { ...state, chats: action.payload };
    case "GET_CHATS_TO_EDIT":
      return { ...state, chatToEdit: action.payload };
    case "GET_USER":
      return { ...state, user: action.payload };
    case "GET_ALL_USERS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const ChatContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! CREATE

  const addChats = async (
    text,
    owner,
    email,
    getter,
    createdAt,
    createdAtMs
  ) => {
    try {
      let chat = {
        text,
        owner,
        email,
        getter,
        createdAt,
        createdAtMs,
      };
      const response = await axios.post(APIchats, chat);

      getChatsForUser(email, getter);
    } catch (e) {
      console.log(e);
    }
  };

  // ! READ -
  const getChatsForUser = async (ownerMail, clientEmail = "") => {
    try {
      const adminMail = "beknazaromurbek@gmail.com";
      const { data } = await axios(APIchats);
      let arr;
      if (ownerMail !== adminMail) {
        arr = data.filter(
          (item) => item.email === ownerMail || item.getter === ownerMail
        );
      } else {
        arr = data.filter(
          (item) =>
            item.getter === clientEmail ||
            (item.getter === adminMail && item.email === clientEmail)
        );
      }

      let action = {
        type: "GET_CHATS_FOR_ROOM",
        payload: arr,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  // ! UPDATE

  const getChatToEdit = async (id) => {
    try {
      const response = await axios(` 
                ${APIchats}/${id}`);
      let action = {
        type: "GET_CHATS_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  const saveEditedChat = async (editedChat, id) => {
    try {
      const response = await axios.patch(`${APIchats}/${id}`, editedChat);
      getChatsForUser(editedChat.email, editedChat.getter);
      // clearState()
    } catch (e) {
      console.log(e);
    }
  };
  const getChatedUsers = async () => {
    try {
      const { data } = await axios(APIusers);
      let arr = data.filter((item) => {
        return item.email !== "beknazaromurbek@gmail.com";
      });
      console.log(arr);
      dispatch({
        type: "GET_ALL_USERS",
        payload: arr,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const deleteChat = async (chat) => {
    try {
      await axios.delete(`${APIchats}/${chat.id}`);
      getChatsForUser(chat.email, chat.getter);
    } catch (e) {
      console.log(e);
    }
  };
  const getUser = async (id) => {
    try {
      const { data } = await axios(APIusers + "?id=" + id);
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <chatsContext.Provider
      value={{
        addChats,
        getChatsForUser,
        getChatToEdit,
        deleteChat,
        getUser,
        saveEditedChat,
        getChatedUsers,
        chats: state.chats,
        chatToEdit: state.chatToEdit,
        chatUser: state.user,
        users: state.users,
        state,
      }}
    >
      {" "}
      {props.children}{" "}
    </chatsContext.Provider>
  );
};

export default ChatContextProvider;
