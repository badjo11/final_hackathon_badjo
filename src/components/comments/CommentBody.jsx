import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputGroup, Button, Card } from "react-bootstrap";
import { timeSince } from "../../const/calcTimeLeft";
import { useParams } from "react-router";
import { commentsContext } from "../../contexts/CommentsContext";
const CommentBody = ({ item }) => {
  const {
    getCommentsForRoom,
    getCommentToEdit,
    saveEditedComment,
    deleteComment,
  } = useContext(commentsContext);
  const [comment, setComment] = useState("");

  function handleDelete(com) {
    deleteComment(com);
  }
  const params = useParams();
  useEffect(() => {
    getCommentsForRoom(params.id);
  }, []);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  let commenting;
  const [bool, setBool] = useState(false);
  const [editComm, setEditComm] = useState("");
  function handleChangeEdit(e) {
    setEditComm(e.target.value);
  }
  function saveComment(item) {
    let ed = { ...item, text: editComm };

    saveEditedComment(ed, item.id);
    setBool(false);
  }

  commenting = (
    <>
      <InputGroup className="mb-3 createComment">
        <FormControl
          rows={2}
          as="textarea"
          placeholder="Оставьте отзыв о враче"
          maxLength="140"
          onChange={handleChangeEdit}
          value={editComm}
        />
      </InputGroup>
      <Button onClick={() => saveComment(item)}>Сохранить</Button>
    </>
  );
  function handleEdit(item) {
    setBool(true);
    getCommentToEdit(item.id);
  }
  return (
    <Card className="mt-2">
      <Card.Header>
        <span style={{ fontWeight: "bold", color: "#979797" }}>
          {item.owner}
        </span>{" "}
        <span>
          {" "}
          {item.createdAt.slice(0, 10)}, {timeSince(item.createdAtMs)} назад{" "}
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Title>{bool ? commenting : item.text}</Card.Title>
        {user ? (
          user.currentUser.displayName === item.owner ? (
            <>
              <small
                onClick={() => handleDelete(item)}
                style={{ color: "red", cursor: "pointer" }}
              >
                Удалить
              </small>
              <small
                onClick={() => {
                  handleEdit(item);
                  setEditComm(item.text);
                }}
                style={{
                  marginLeft: "5px",
                  color: "darkgreen",
                  cursor: "pointer",
                }}
              >
                Изменить
              </small>
            </>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentBody;
