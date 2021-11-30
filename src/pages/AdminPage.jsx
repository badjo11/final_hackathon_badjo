import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { chatsContext } from "../contexts/ChatContext";

const AdminPage = () => {
  const { getChatedUsers, users } = useContext(chatsContext);
  useEffect(() => {
    getChatedUsers();
  }, []);

  return (
    <div>
      <Table
        striped
        bordered
        hover
        style={{ fontSize: "12px" }}
        className="container"
      >
        <thead>
          <tr>
            <th>#</th>
            <th align="right">Пользователь</th>
          </tr>
        </thead>

        <tbody>
          {users ? (
            users.map((item, index) => (
              <tr
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <td component="th" scope="row">
                  {index + 1}
                </td>

                <td align="left">
                  <Link to={`/chat/${item.email}`}>{item.email}</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <p>Loading...</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
