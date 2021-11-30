import { Formik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { subscribersContext } from "../contexts/SubscribersContext";
const SubscribePage = () => {
  const [flag, setFlag] = useState(false);

  const schema = yup.object({
    number: yup
      .number()
      .min(1000000000000000, "Минимальное количество символов 16")
      .max(9999999999999999, "Максимальное количество символов 16")
      .required("Данное поле обязательно для заполнения"),
    month: yup.string().required("Данное поле обязательно для заполнения"),
    name: yup
      .string()
      .min(6, "Минимальное количество символов 6")
      .max(150, "Максимальное количество символов 150")
      .required("Данное поле обязательно для заполнения"),
    cvv: yup
      .number()
      .min(100, "Минимальное количество символов 3")
      .max(999, "Максимальное количество символов 3")
      .required("Данное поле обязательно для заполнения"),
  });
  const navigate = useNavigate();
  function handleShow() {
    navigate("/");
  }
  let user = JSON.parse(localStorage.getItem("user"));
  const [discount, setDiscount] = useState(0);
  //   let discount = 0;
  const { addSubscribers } = useContext(subscribersContext);
  return (
    <div className="container">
      <h3>Подписка на наш сайт</h3>
      <p>
        Подписавшись на наш сайт вы будете получать еженедельные уведомления и
        каждый месяц с вашей карты будет вычитаться 200 (400, 600) сом в
        зависимости от пакета. Мы в свою очередь предоставляем ваш 10% скидку на
        любые товары.
        <br />
        Согласны?
      </p>
      <Button
        onClick={() => {
          setFlag(true);
        }}
      >
        Согласен
      </Button>
      {flag ? (
        <div style={{ width: "50%", margin: "0 auto" }}>
          <h2
            style={{
              width: "50%",
              textAlign: "center",
              color: "#31B8BF",
              margin: "0 auto",
            }}
          >
            Форма оплаты
          </h2>
          <Formik
            validationSchema={schema}
            onSubmit={() => {
              addSubscribers(user.currentUser.email, discount);
              navigate("/");
            }}
            initialValues={{
              number: "",
              month: "",
              name: "",
              cvv: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form
                style={{ alignItems: "center", width: "100%" }}
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail1">
                  <Form.Label>Номер вашей карты</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="16"
                    placeholder="Введите номер карты"
                    name="number"
                    onChange={handleChange}
                    isValid={!errors.number && touched.number}
                    isInvalid={!!errors.number}
                    value={values.number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.number}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail2">
                  <Form.Label>Месяц и год</Form.Label>
                  <Form.Control
                    type="month"
                    placeholder="Введите месяц и год"
                    name="month"
                    onChange={handleChange}
                    isValid={!errors.month && touched.month}
                    isInvalid={!!errors.month}
                    value={values.month}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.month}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail3">
                  <Form.Label>Ваше имя</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите имя"
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
                <Form.Group className="mb-3" controlId="formBasicPassword4">
                  <Form.Label>Ваш CVV код</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите CVV код"
                    name="cvv"
                    maxLength="3"
                    onChange={handleChange}
                    isValid={!errors.cvv && touched.cvv}
                    isInvalid={!!errors.cvv}
                    value={values.cvv}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    setDiscount(5);
                  }}
                >
                  Обычный
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={() => {
                    setDiscount(10);
                  }}
                >
                  Комфорт
                </Button>
                <Button
                  variant="warning"
                  type="submit"
                  onClick={() => {
                    setDiscount(20);
                  }}
                >
                  Премиум
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SubscribePage;
