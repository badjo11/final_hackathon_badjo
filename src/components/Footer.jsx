import React from "react";

const Footer = () => {
  return (
    <div className="my-footer">
      <div>
        <img style={{ width: "100%", paddingTop: "30px" }} alt="" />
      </div>
      <div
        style={{
          backgroundColor: "#31B8BF",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          color: "white",
          paddingTop: "25px",
          paddingBottom: "25px",
        }}
      >
        <div>
          <strong>Basketball</strong>
          <p className="para">О нас</p>
          <p className="para">Помощь</p>
          <p className="para">Вопросы и ответы</p>
          <p className="para">Контакты</p>
        </div>
        <div className="first_footer_inner">
          <strong>Наши Услуги</strong>
          <p className="para">Покупа</p>
          <p className="para">Онлайн оплата</p>
          <p className="para">Онлайн помощь</p>
          <p className="para">Стать нашим Партнером</p>
        </div>
        <div className="second_footer_inner">
          <strong>Клиентам</strong>
          <p className="para">Онлайн чат</p>
          <p className="para">Каталог</p>
          <p className="para">Магазины</p>
          <p className="para">Адреса</p>
        </div>
        <div className="third_footer_inner">
          <strong>Контакты</strong>
          <p className="para">Телефон: +996 777 52 14 41</p>
          <p className="para">Email: hello@gmail.com</p>
          <p className="para">Адрес: ул.Табышалиева, 29</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
