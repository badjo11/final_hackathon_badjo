import React, { useContext, useEffect } from "react";
import { productContext } from "../contexts/ProductsContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParams } from "react-router";
import { subscribersContext } from "../contexts/SubscribersContext";
const RecommendItems = () => {
  const { getRecommend, recommendedProducts } = useContext(productContext);
  const params = useParams();
  useEffect(() => {
    getRecommend(params.id);
  }, []);
  let user = JSON.parse(localStorage.getItem("user"));
  const { getSubscriber, subscribers, checkSubscribe, checking } =
    useContext(subscribersContext);
  useEffect(() => {
    getSubscriber(user.currentUser.email);
    checkSubscribe(user.currentUser.email);
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <h4 style={{ marginTop: "50px" }}>Recommendations for you</h4>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {recommendedProducts ? (
          recommendedProducts.map((item) => (
            <div
              key={item.id}
              style={{ paddingBottom: "50px", paddingLeft: "100px" }}
            >
              <img
                style={{ objectFit: "fill" }}
                width="180px"
                height="140px"
                src={item.image}
                alt=""
              />
              <p>
                {item.name}
                <br />{" "}
                <strong>
                  {checking ? (
                    subscribers ? (
                      <>
                        <del style={{ color: "red" }}>{item.price}</del>
                        <ins style={{ color: "blue", fontWeight: "500" }}>
                          {Math.round(
                            (item.price * (100 - subscribers.discount)) / 100
                          )}
                        </ins>
                      </>
                    ) : (
                      <h4>Load</h4>
                    )
                  ) : (
                    item.price
                  )}
                </strong>
              </p>
            </div>
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </Carousel>
    </>
  );
};

export default RecommendItems;
