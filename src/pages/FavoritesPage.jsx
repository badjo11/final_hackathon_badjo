import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { productContext } from "../contexts/ProductsContext";

const FavoritesPage = () => {
  const { getAllFavorites, favorites } = useContext(productContext);
  useEffect(() => {
    getAllFavorites();
  }, []);
  return (
    <div>
      <h2 style={{ color: "#31B8BF", textAlign: "center", marginTop: "25px" }}>
        Избранное
      </h2>
      {favorites ? (
        <Table>
          <thead>
            <tr>
              <th>Услуга</th>
              <th align="right">Брэнд</th>
            </tr>
          </thead>

          <tbody>
            {favorites.products.map((item) => (
              <tr
                key={item.product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <td component="th" scope="row">
                  {item.product.name}
                </td>
                <td align="right">{item.product.brand}</td>
                <td align="right"></td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        // qwe

        <h2
          style={{ color: "#1C374C", textAlign: "center", marginTop: "25px" }}
        >
          Вы еще не добавили услуги в избранное
        </h2>
      )}
    </div>
  );
};

export default FavoritesPage;
