import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/ProductsContext";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, InputGroup, FormControl } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { subscribersContext } from "../contexts/SubscribersContext";
import { viewsContext } from "../contexts/ViewsContext";
const ProductPage = () => {
  const {
    addProducts,
    getProducts,
    deleteProduct,
    currentPosts,
    setCurrentPage,
    addAndDeleteProductInCart,
    checkProductInCart,
    addAndDeleteProductInFavorites,
    checkProductInFavorites,
  } = useContext(productContext);
  const { addViews } = useContext(viewsContext);

  const schema = yup.object().shape({
    name: yup.string().min(2).max(30).required("Required"),
    brand: yup.string().required("Required"),
    description: yup.string().min(5).max(100).required("Required"),
    image: yup.string().required("Required"),
    price: yup.string().min(3).max(255).required("Required"),
  });
  useEffect(() => {
    getProducts();
  }, []);
  const navigate = useNavigate();
  let addForm;

  let object = new URLSearchParams(window.location.search);
  const [brandValue, setBrandValue] = useState("");
  function filterProducts(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getProducts();
    setBrandValue(value);
  }

  useEffect(() => {
    setBrandValue(object.get("brand"));
  }, [object]);
  let user = JSON.parse(localStorage.getItem("user"));
  const { getSubscriber, subscribers, checkSubscribe, checking } =
    useContext(subscribersContext);
  useEffect(() => {
    getSubscriber(user.currentUser.email);
    checkSubscribe(user.currentUser.email);
  }, []);
  if (user) {
    if (user.currentUser.email === "beknazaromurbek@gmail.com") {
      addForm = (
        <div>
          <Formik
            validationSchema={schema}
            onSubmit={(data, { resetForm }) => {
              addProducts(data);
              resetForm();
            }}
            initialValues={{
              name: "",
              brand: "",
              description: "",
              image: "",
              price: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form
                style={{ width: "90%", margin: "0 auto" }}
                className="bg-light p-4"
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>???????????????? ??????????????????</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="?????????????? ???????????????? ??????????????????"
                    name="name"
                    onChange={handleChange}
                    isValid={!errors.name && touched.name}
                    isInvalid={!!errors.name}
                    value={values.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail1">
                  <Form.Label>?????????? ????????????</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="brand"
                    onChange={handleChange}
                    isValid={!errors.brand && touched.brand}
                    isInvalid={!!errors.brand}
                    value={values.brand}
                  >
                    <option>???????????????? ??????????</option>
                    <option value="Lebron">Lebrons</option>
                    <option value="Jordan">Jordans</option>
                    <option value="Under Armour">Under Armour</option>
                    <option value="Kobe Bryant">Kobe Bryant</option>
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.brand}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>???????????????? ????????????</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="?????????????? ???????????????? ??????????????????"
                    name="description"
                    onChange={handleChange}
                    isValid={!errors.description && touched.description}
                    isInvalid={!!errors.description}
                    value={values.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>???????????????? ????????????</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="?????????????? ???????????????? ??????????????????"
                    name="image"
                    onChange={handleChange}
                    isValid={!errors.image && touched.image}
                    isInvalid={!!errors.image}
                    value={values.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.image}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail2">
                  <Form.Label>???????? ????????????</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="?????????????? ???????? ????????????"
                    name="price"
                    onChange={handleChange}
                    isValid={!errors.price && touched.price}
                    isInvalid={!!errors.price}
                    value={values.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  style={{
                    border: "none",
                    marginLeft: "0",
                    backgroundColor: "#1C374C",
                  }}
                  variant="primary"
                  type="submit"
                >
                  ??????????????????
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      );
    }
  }
  return (
    <div className="filter">
      <div className="in_filter">
        <h3 style={{ textAlign: "center" }}>Filter</h3>
        <Form.Group
          className="mb-3"
          value={brandValue}
          controlId="formBasicEmail"
          onChange={(e) => {
            filterProducts("brand", e.target.value);
            setCurrentPage(1);
          }}
        >
          <Form.Check
            block="true"
            label="Lebron"
            value="Lebron"
            name="brand"
            type="radio"
            id="inline-radio-1"
            // onChange={() => setRole('doc')}
          />
          <Form.Check
            block="true"
            label="Jordan"
            value="Jordan"
            name="brand"
            type="radio"
            id="inline-radio-2"
            // onChange={() => setRole('pac')}
          />
          <Form.Check
            block="true"
            label="Under Armour"
            value="Under Armour"
            name="brand"
            type="radio"
            id="inline-radio-2"
            // onChange={() => setRole('pac')}
          />
          <Form.Check
            block="true"
            label="Kobe Bryant"
            value="Kobe Bryant"
            name="brand"
            type="radio"
            id="inline-radio-2"
            // onChange={() => setRole('pac')}
          />
        </Form.Group>
      </div>
      <div style={{ width: "85%" }}>
        <InputGroup className="mb-3 createComment">
          <FormControl
            rows={2}
            as="textarea"
            placeholder="?????????? ???????????? ???? ???????????????? ????????????"
            maxLength="140"
            onChange={(e) => {
              filterProducts("q", e.target.value);
              setCurrentPage(1);
            }}
          />
        </InputGroup>
        {addForm}
        {currentPosts ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {/* {console.log(currentPosts)} */}
            {currentPosts.map((item) => {
              return (
                <Card
                  key={item.id}
                  style={{ width: "18rem", border: "1px solid #31B8BF" }}
                >
                  <Card.Body>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Title style={{ fontWeight: "bold" }}>
                      {item.name}
                    </Card.Title>
                    <Card.Subtitle>Brand: {item.brand}</Card.Subtitle>
                    <Card.Text>
                      ????????:{" "}
                      {checking ? (
                        subscribers ? (
                          <>
                            <del style={{ color: "red" }}>{item.price}</del>
                            <ins style={{ color: "blue", fontWeight: "500" }}>
                              {Math.round(
                                (item.price * (100 - subscribers.discount)) /
                                  100
                              )}
                            </ins>
                          </>
                        ) : (
                          <p>Load</p>
                        )
                      ) : (
                        item.price
                      )}
                    </Card.Text>
                    {user.currentUser.email !== "guest" ? (
                      user.currentUser.email === "beknazaromurbek@gmail.com" &&
                      user ? (
                        <>
                          <Link to={"/edit/" + item.id}>
                            <Button
                              style={{
                                marginLeft: "0",
                                border: "none",
                                backgroundColor: "#31B8BF",
                              }}
                            >
                              ??????????????????????????
                            </Button>
                          </Link>
                          <Button
                            style={{
                              marginLeft: "5px",
                              border: "none",
                              backgroundColor: "#31B8BF",
                            }}
                            onClick={() => {
                              deleteProduct(item.id);
                            }}
                          >
                            ??????????????
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            style={{ marginRight: "10px" }}
                            variant={
                              checkProductInCart(item.id) ? "danger" : "primary"
                            }
                            onClick={() => {
                              {
                                checking ? (
                                  subscribers ? (
                                    <>
                                      {addAndDeleteProductInCart(
                                        item,
                                        subscribers.discount
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )
                                ) : (
                                  <>{addAndDeleteProductInCart(item)}</>
                                );
                              }
                            }}
                          >
                            ??????????????
                          </Button>
                          <Button
                            variant={
                              checkProductInFavorites(item.id)
                                ? "danger"
                                : "primary"
                            }
                            onClick={() => addAndDeleteProductInFavorites(item)}
                          >
                            ??????????????????
                          </Button>
                        </>
                      )
                    ) : (
                      <></>
                    )}
                    {user.currentUser.email !== "guest" ? (
                      <Link to={"detail/" + item.id}>
                        <Button
                          style={{
                            marginLeft: "50px",
                            marginTop: "10px",
                          }}
                          variant="dark"
                        >
                          ??????????????????
                        </Button>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
        <Pagination />
      </div>
    </div>
  );
};

export default ProductPage;
