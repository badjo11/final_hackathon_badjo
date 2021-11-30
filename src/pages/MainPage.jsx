import React, { useContext, useEffect } from "react";
import { Card, Carousel, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { productContext } from "../contexts/ProductsContext";
const MainPage = () => {
  const { products, getProducts } = useContext(productContext);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="">
      <div style={{ width: "98vw" }}>
        <img
          style={{
            objectFit: "contain",
            width: "100%",
            height: "auto",
            margin: "0 auto",
          }}
          src="https://www.teahub.io/photos/full/17-178683_1920x1080-air-jordan-shoes-wallpapers-air-jordan-shoes.jpg"
          alt="header"
        />
        <div className="first-cards d-flex container">
          <Card
            style={{
              width: "18rem",
              boxShadow: "4px 4px 8px 0px rgba(23, 27, 30, 0.63)",
            }}
          >
            {products ? (
              <Card.Img
                style={{ width: "135px", margin: "0 auto", padding: "20px" }}
                src={products[0].image}
              />
            ) : (
              <></>
            )}
            <Card.Body>
              <Card.Title style={{ color: "#31B8BF", textAlign: "center" }}>
                Онлайн консультации
              </Card.Title>
              <Card.Text style={{ color: "black", textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Card.Text>
              <Button className="btn-first-session">Получить</Button>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "18rem",
              boxShadow: "4px 4px 8px 0px rgba(23, 27, 30, 0.63)",
            }}
          >
            {products ? (
              <Card.Img
                style={{ width: "100px", margin: "0 auto", padding: "15px" }}
                src={products[1].image}
              />
            ) : (
              <></>
            )}
            <Card.Body>
              <Card.Title style={{ color: "#31B8BF", textAlign: "center" }}>
                Магазин
              </Card.Title>
              <Card.Text style={{ color: "black", textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Card.Text>
              <Button className="btn-first-session">Пройти</Button>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "18rem",
              boxShadow: "4px 4px 8px 0px rgba(23, 27, 30, 0.63)",
            }}
          >
            {products ? (
              <Card.Img
                style={{ width: "100px", margin: "0 auto", padding: "15px" }}
                src={products[2].image}
              />
            ) : (
              <></>
            )}
            <Card.Body>
              <Card.Title style={{ color: "#31B8BF", textAlign: "center" }}>
                Чат с админом
              </Card.Title>
              <Card.Text style={{ color: "black", textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Card.Text>
              <Link to="/doctor">
                <Button className="btn-first-session">Записаться </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="second-cards d-flex container">
          <h2 className="second-main-text">Как это работает</h2>
          <h4 className="first-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi…
          </h4>
        </div>
        <div className="first-cards d-flex container">
          <Card
            style={{
              width: "18rem",
              boxShadow: "4px 4px 8px 0px rgba(23, 27, 30, 0.63)",
            }}
          >
            {products ? (
              <Card.Img
                style={{ width: "130px", margin: "0 auto", padding: "20px" }}
                src={products[3].image}
              />
            ) : (
              <></>
            )}
            <Card.Body>
              <Card.Title style={{ color: "#31B8BF", textAlign: "center" }}>
                Найти товар
              </Card.Title>
              <Card.Text style={{ color: "black", textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "18rem",
              boxShadow: "4px 4px 8px 0px rgba(23, 27, 30, 0.63)",
            }}
          >
            {products ? (
              <Card.Img
                style={{ width: "130px", margin: "0 auto", padding: "20px" }}
                src={products[4].image}
              />
            ) : (
              <></>
            )}
            <Card.Body>
              <Card.Title style={{ color: "#31B8BF", textAlign: "center" }}>
                Посмотреть весь каталог
              </Card.Title>
              <Card.Text style={{ color: "black", textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "18rem",
              boxShadow: "4px 4px 8px 0px rgba(23, 27, 30, 0.63)",
            }}
          >
            {products ? (
              <Card.Img
                style={{ width: "130px", margin: "0 auto", padding: "20px" }}
                src={products[5].image}
              />
            ) : (
              <></>
            )}
            <Card.Body>
              <Card.Title style={{ color: "#31B8BF", textAlign: "center" }}>
                Оставить отзыв
              </Card.Title>
              <Card.Text style={{ color: "black", textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="third-session">
          <div className="third-cards d-flex container">
            <h2 className="third-main-text">Популярные товары</h2>
            <h4 className="second-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi…
            </h4>
          </div>
          <div className="slider">
            <Carousel>
              <Carousel.Item>
                {products ? (
                  <img
                    className=" d-block"
                    style={{ width: "50vw", height: "50vh" }}
                    src={products[6].image}
                    alt="First slide"
                  />
                ) : (
                  <></>
                )}
                <Carousel.Caption>
                  {products ? (
                    <>
                      <h3 style={{ color: "white" }}>{products[10].name}</h3>
                      <p>{products[10].brand}</p>
                    </>
                  ) : (
                    <></>
                  )}
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                {products ? (
                  <>
                    <img
                      className="d-block"
                      style={{ width: "50vw", height: "50vh" }}
                      src={products[7].image}
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h3>{products[7].name}</h3>
                      <p>{products[7].brand}</p>
                    </Carousel.Caption>
                  </>
                ) : (
                  <></>
                )}
              </Carousel.Item>
              <Carousel.Item>
                {products ? (
                  <>
                    <img
                      className="d-block "
                      style={{ width: "50vw", height: "50vh" }}
                      src={products[8].image}
                      alt="Third slide"
                    />
                    <Carousel.Caption>
                      <h3>{products[8].name}</h3>
                      <p>{products[8].brand}</p>
                    </Carousel.Caption>
                  </>
                ) : (
                  <></>
                )}
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="fourth-session">
            <div className="container">
              <h2 className="fourth-main-text">Часто задаваемые вопросы</h2>
              <div className="common-questions">
                <div className="left-side" style={{ width: "220%" }}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Можно ли сделать онлайн заказ?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Можно ли оставить отзыв о товаре?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Имеется ли безналичная оплата?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        Можно ли связаться с админом?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="right-side ms-4">
                  {products ? (
                    <img
                      className="adaptive-pic"
                      style={{ width: "50%" }}
                      src={products[9].image}
                      alt=""
                    />
                  ) : (
                    <></>
                  )}
                  <h3 className="rigth-side-text">
                    Lorem ipsum dolor sit amet?
                  </h3>
                  <p>
                    Id sit velit pariatur et magna nostrud qui nisi veniam
                    cupidatat. Sunt voluptate amet fugiat labore veniam minim.
                    Ad pariatur proident magna magna amet velit eiusmod. Minim
                    occaecat tempor anim aute mollit do incididunt dolore
                    officia est laborum aliqua. Nulla consequat ad et pariatur
                    nostrud ex aute et.{" "}
                  </p>
                  <Button className="btn-right-side">Ещё</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default MainPage;
