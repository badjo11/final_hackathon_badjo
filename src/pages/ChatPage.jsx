import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputGroup, Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { timeSince } from "../const/calcTimeLeft";
import { chatsContext } from "../contexts/ChatContext";

const ChatPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const {
    addChats,
    getChatsForUser,
    getUser,
    getChatToEdit,
    deleteChat,
    saveEditedChat,
    chats,
    chatToEdit,
    chatUser,
  } = useContext(chatsContext);
  const [bool, setBool] = useState(false);

  const params = useParams();
  //   setTimeout(() => getChatsForUser(user.currentUser.email), 10000);
  //   console.log(params);
  useEffect(() => {
    if (user.currentUser.email === "beknazaromurbek@gmail.com") {
      getChatsForUser(user.currentUser.email, params.ownerMail);
    } else {
      getChatsForUser(user.currentUser.email);
    }
    getUser(params.ownerMail);
  }, []);
  const [chat, setChat] = useState("");
  function handleChange(e) {
    setChat(e.target.value);
  }
  const [editComm, setEditComm] = useState("");
  function handleEdit(item) {
    setBool(true);
    getChatToEdit(item.id);
  }
  function handleDelete(chat) {
    deleteChat(chat);
  }
  function handleChangeEdit(e) {
    setEditComm(e.target.value);
  }
  function saveComment(item) {
    let ed = { ...item, text: editComm };

    saveEditedChat(ed, item.id);
    setBool(false);
  }
  function creatingChat(e) {
    e.preventDefault();
    let time = new Date();
    let timeMls = Date.now();
    let tempUserName;
    if (user.currentUser) {
      tempUserName = user.currentUser.displayName;
    } else {
      tempUserName = user.username;
    }
    if (user.currentUser.email !== "beknazaromurbek@gmail.com") {
      addChats(
        chat,
        tempUserName,
        user.currentUser.email,
        "beknazaromurbek@gmail.com",
        time,
        timeMls
      );
    } else {
      {
        addChats(
          chat,
          "beknazaromurbek@gmail.com",
          user.currentUser.email,
          params.ownerMail,
          time,
          timeMls
        );
      }
    }
    setChat("");
  }
  const [ch, setCh] = useState(-1);
  return (
    <div
      style={{ margin: "0 auto", width: "60%", backgroundColor: "lightblue" }}
    >
      <h4>Chat page</h4>
      <div className="mt-4 container">
        <InputGroup className="mb-3 createComment">
          <FormControl
            rows={2}
            as="textarea"
            placeholder="Ваше сообщение"
            maxLength="140"
            onChange={handleChange}
            value={chat}
          />
          <Button
            style={{ backgroundColor: "#31B8BF", border: "none" }}
            onClick={creatingChat}
          >
            Отправить
          </Button>
        </InputGroup>
        <div className="mt-4 container bg-light">
          {chats ? (
            chats
              .sort((a, b) => b.createdAtMs - a.createdAtMs)
              .map((item, index) => (
                <Card key={item.id} className="mt-2">
                  <Card.Header>
                    <span style={{ fontWeight: "bold", color: "#979797" }}>
                      {item.owner}
                    </span>{" "}
                    <span>
                      {" "}
                      {item.createdAt.slice(0, 10)},{" "}
                      {timeSince(item.createdAtMs)} назад{" "}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {bool && index === ch ? (
                        <>
                          <InputGroup className="mb-3 createComment">
                            <FormControl
                              rows={2}
                              as="textarea"
                              placeholder="Ваше сообщение"
                              maxLength="140"
                              onChange={handleChangeEdit}
                              value={editComm}
                            />
                          </InputGroup>
                          <Button onClick={() => saveComment(item)}>
                            Сохранить
                          </Button>
                        </>
                      ) : item.email === "beknazaromurbek@gmail.com" ? (
                        <p style={{ textAlign: "left" }}>{item.text}</p>
                      ) : (
                        <p style={{ textAlign: "right" }}>{item.text}</p>
                      )}
                    </Card.Title>
                    {user ? (
                      user.currentUser.email === item.email ? (
                        <div
                          style={{
                            textAlign:
                              item.email === "beknazaromurbek@gmail.com"
                                ? "left"
                                : "right",
                          }}
                        >
                          <small
                            onClick={() => handleDelete(item)}
                            style={{
                              color: "red",
                              cursor: "pointer",
                            }}
                          >
                            Удалить
                          </small>
                          <small
                            onClick={() => {
                              handleEdit(item);
                              setEditComm(item.text);
                              setCh(index);
                            }}
                            style={{
                              marginLeft: "5px",
                              color: "darkgreen",
                              cursor: "pointer",
                            }}
                          >
                            Изменить
                          </small>
                        </div>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </Card.Body>
                </Card>
              ))
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
