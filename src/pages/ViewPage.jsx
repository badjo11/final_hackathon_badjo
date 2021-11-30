import React, { useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { productContext } from "../contexts/ProductsContext";
import { subscribersContext } from "../contexts/SubscribersContext";
import { viewsContext } from "../contexts/ViewsContext";

const ViewPage = () => {
  const { getViews, views } = useContext(viewsContext);
  const {
    checkProductInCart,
    checkProductInFavorites,
    addAndDeleteProductInCart,
    addAndDeleteProductInFavorites,
  } = useContext(productContext);
  let user = JSON.parse(localStorage.getItem("user"));
  const { getSubscriber, subscribers, checkSubscribe, checking } =
    useContext(subscribersContext);
  useEffect(() => {
    getSubscriber(user.currentUser.email);
    checkSubscribe(user.currentUser.email);
  }, []);
  useEffect(() => {
    getViews(user.currentUser.email);
  }, []);
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {views ? (
        views.map((item) => (
          <Card
            key={item.product.id}
            style={{ width: "18rem", border: "1px solid #31B8BF" }}
          >
            <Card.Body>
              <Card.Img variant="top" src={item.product.image} />
              <Card.Title style={{ fontWeight: "bold" }}>
                {item.product.name}
              </Card.Title>
              <Card.Subtitle>Brand: {item.product.brand}</Card.Subtitle>
              <Card.Text>
                Цена:{" "}
                {checking ? (
                  subscribers ? (
                    <>
                      <del style={{ color: "red" }}>{item.product.price}</del>
                      <ins style={{ color: "blue", fontWeight: "500" }}>
                        {Math.round(
                          (item.product.price * (100 - subscribers.discount)) /
                            100
                        )}
                      </ins>
                    </>
                  ) : (
                    <h4>Load</h4>
                  )
                ) : (
                  item.product.price
                )}
              </Card.Text>

              <>
                <Button
                  style={{ marginRight: "10px" }}
                  variant={
                    checkProductInCart(item.product.id) ? "danger" : "primary"
                  }
                  onClick={() => {
                    {
                      checking ? (
                        subscribers ? (
                          <>
                            {addAndDeleteProductInCart(
                              item.product,
                              subscribers.discount
                            )}
                          </>
                        ) : (
                          <></>
                        )
                      ) : (
                        <>{addAndDeleteProductInCart(item.product)}</>
                      );
                    }
                  }}
                >
                  Корзина
                </Button>
                <Button
                  variant={
                    checkProductInFavorites(item.product.id)
                      ? "danger"
                      : "primary"
                  }
                  onClick={() => addAndDeleteProductInFavorites(item.product)}
                >
                  Избранное
                </Button>
              </>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default ViewPage;
