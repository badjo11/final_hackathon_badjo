import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { historyContext } from "../contexts/HistoryContext";

const HistoryPage = () => {
  const { getHistory, history } = useContext(historyContext);
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getHistory(user.currentUser.email);
  }, []);
  return (
    <>
      <h3>История ваших покупок</h3>
      {history ? (
        history.map((item) =>
          item.cart.products.length ? (
            <div
              key={item.id}
              style={{ width: "100%", borderBottom: "2px lightblue solid" }}
            >
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
                  {item.cart.products.map((item) => (
                    <tr
                      key={item.product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <td component="th" scope="row">
                        {item.product.name}
                      </td>
                      <td align="right">{item.product.brand}</td>
                      <td align="right">{item.count}</td>
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
                      {item.cart ? item.cart.totalPrice : 0} сом
                    </td>
                  </tr>
                </tbody>
              </Table>

              <h3>Total price: {item.cart ? item.cart.totalPrice : 0} сом</h3>
              <h4>Дата покупки: {item.date.slice(0, 10)}</h4>
            </div>
          ) : (
            <h2
              style={{
                color: "#1C374C",
                textAlign: "center",
                marginTop: "25px",
              }}
            >
              Вы еще не добавили услуги в корзину
            </h2>
          )
        )
      ) : (
        <h2
          style={{ color: "#1C374C", textAlign: "center", marginTop: "25px" }}
        >
          Вы еще не добавили услуги в корзину
        </h2>
      )}
      {history ? (
        history[0] === undefined ? (
          <h4>Вы еще не совершали покупок</h4>
        ) : (
          <></>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default HistoryPage;
