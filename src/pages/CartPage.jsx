import React, { useContext, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { productContext } from "../contexts/ProductsContext";
import { subscribersContext } from "../contexts/SubscribersContext";

const CartPage = () => {
  const { changeCountProduct, getAll, cart } = useContext(productContext);
  const { getSubscriber, subscribers, checkSubscribe, checking } =
    useContext(subscribersContext);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getSubscriber(user.currentUser.email);
    checkSubscribe(user.currentUser.email);
  }, []);
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div>
      <h2 style={{ color: "#31B8BF", textAlign: "center", marginTop: "25px" }}>
        Корзина
      </h2>
      {cart ? (
        cart.products.length ? (
          <>
            <Table striped bordered hover style={{ fontSize: "12px" }}>
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th align="right">Брэнд</th>
                  <th align="right">Количество</th>
                  <th align="right">Сумма</th>
                </tr>
              </thead>

              <tbody>
                {cart.products.map((item) => (
                  <tr
                    key={item.product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <td component="th" scope="row">
                      {item.product.name}
                    </td>
                    <td align="right">{item.product.brand}</td>
                    <td align="right">
                      <input
                        type="number"
                        onChange={(e) => {
                          {
                            checking ? (
                              subscribers ? (
                                <>
                                  {changeCountProduct(
                                    e.target.value,
                                    item.product.id,
                                    subscribers.discount
                                  )}
                                </>
                              ) : (
                                <></>
                              )
                            ) : (
                              <>
                                {changeCountProduct(
                                  e.target.value,
                                  item.product.id
                                )}
                              </>
                            );
                          }
                        }}
                        value={item.count}
                        style={{ width: "40px" }}
                      />
                    </td>
                    <td align="right">{item.subPrice}</td>
                  </tr>
                ))}

                <tr>
                  <td
                    colSpan={3}
                    align="right"
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Total:{" "}
                  </td>
                  <td
                    align="right"
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    {cart ? cart.totalPrice : 0} сом
                  </td>
                </tr>
              </tbody>
            </Table>

            <h3>Total price: {cart ? cart.totalPrice : 0} сом</h3>
            {cart ? (
              <Link to="/order">
                <Button style={{ backgroundColor: "#31B8BF", border: "none" }}>
                  Произвести оплату
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </>
        ) : (
          <h2
            style={{ color: "#1C374C", textAlign: "center", marginTop: "25px" }}
          >
            Вы еще не добавили услуги в корзину
          </h2>
        )
      ) : (
        <h2
          style={{ color: "#1C374C", textAlign: "center", marginTop: "25px" }}
        >
          Вы еще не добавили услуги в корзину
        </h2>
      )}
    </div>
  );
};

export default CartPage;
