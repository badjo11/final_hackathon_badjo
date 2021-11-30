import React, { useContext, useEffect } from "react";
import { Container, Button, Navbar, Nav, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { BsFillCartFill, BsHeartFill } from "react-icons/bs";
import { productContext } from "../contexts/ProductsContext";
import { subscribersContext } from "../contexts/SubscribersContext";
const Navibar = () => {
  const { authWithGoogle, googleUser, logOut } = React.useContext(authContext);
  const { countOfProducts, countOfProductsFavorites } =
    useContext(productContext);
  const { checkSubscribe, checking, deleteSubscribe } =
    useContext(subscribersContext);
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    // console.log(user);
    localStorage.setItem(
      "user",
      JSON.stringify({
        currentUser: {
          email: "guest",
        },
      })
    );
    // console.log(JSON.parse(localStorage.getItem("user")));
  }
  useEffect(() => {
    checkSubscribe(user.currentUser.email);
  }, []);
  const history = useNavigate();
  const handleLogOut = () => {
    logOut();
    history("/");
    localStorage.clear();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Basket world</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            <Link
              style={{
                padding: "3px",
                textDecoration: "none",
                color: "#000000",
              }}
              to="/"
            >
              Home
            </Link>
            <Link
              style={{
                padding: "3px",
                textDecoration: "none",
                color: "#000000",
              }}
              to="/history"
            >
              History
            </Link>
            <Link
              style={{
                padding: "3px",
                textDecoration: "none",
                color: "#000000",
              }}
              to="/views"
            >
              Views
            </Link>
            <Link
              style={{
                padding: "3px",
                textDecoration: "none",
                color: "#000000",
              }}
              to="/products"
            >
              Products
            </Link>
          </Nav>
          {googleUser ? (
            <>
              {googleUser.email === "beknazaromurbek@gmail.com" ? (
                <Link to="/chat">Admin</Link>
              ) : (
                <Link to={`/chat/${googleUser.email}`}>
                  <Button className="me-3">Chat with admin</Button>
                </Link>
              )}
              {checking ? (
                <Button
                  variant="danger"
                  onClick={() => {
                    // console.log(googleUser);
                    deleteSubscribe(googleUser.email);
                  }}
                >
                  Отписаться
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button>Подписаться</Button>
                </Link>
              )}

              {googleUser.email !== "beknazaromurbek@gmail.com" ? (
                <>
                  <Link style={{ marginRight: "10px" }} to="/cart">
                    {" "}
                    <Badge bg="secondary">
                      {countOfProducts}
                      <BsFillCartFill />
                    </Badge>
                  </Link>
                  <Link to="/favorites">
                    {" "}
                    <Badge bg="secondary">
                      {countOfProductsFavorites}
                      <BsHeartFill />
                    </Badge>
                  </Link>
                </>
              ) : (
                <></>
              )}

              <h6>{googleUser.displayName}</h6>
              <Button
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  handleLogOut();
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-dark" onClick={authWithGoogle}>
                <img
                  width="30px"
                  src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  alt="google"
                />
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navibar;
