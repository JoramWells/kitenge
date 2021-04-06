import React, { useEffect, useState } from "react";
import { Image, Row, Col, Button, Card } from "antd";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import a4 from "./img/a4.jpeg";
import a2 from "./img/a2.jpeg";
import a3 from "./img/a3.jpeg";
import { listCategory } from "../_actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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

export default function CarouselHeader() {
  const CategoryList = useSelector((state) => state.categoryLists);

  const { loading, posts, error } = CategoryList;
  const [cats, setCat] = useState([]);
  const [show, setShow] = useState(false);

  // const categoryDetail = useSelector((state) => state.categoryList);
  // const { posts, loading, error } = categoryDetail;

  const dispatch = useDispatch();

  const fetchData = async (id) => {
    const { data } = await axios.get("/category/" + id);
    setCat(data);
    setShow(true);
    console.log(data);
  };

  useEffect(() => {
    dispatch(listCategory());
    return () => {};
  }, []);
  return (
    <>
      <Row
        justify="space-around"
        align="middle"
        style={{ position: "sticky", top: "0px" }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Col md={12} sm={8} style={{ padding: "1rem" }}>
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              renderButtonGroupOutside={true}
              arrows={false}
            >
              {posts.map((post) => (
                <Button
                  style={{
                    borderRadius: "50px",
                    backgroundColor: "whitesmoke",
                    border: "none",
                  }}
                  onClick={() => fetchData(post.category)}
                >
                  {post.category}
                </Button>
              ))}
            </Carousel>
          </Col>
        )}
      </Row>

      <Row
        justify="space-around"
        align="middle"
        hidden={show}
        style={{ margin: "2rem" }}
      >
        <Col>
          <Image src={a2} width="250px" height="auto" alt="ldsmdfkljfd" />
        </Col>
        <Col>
          <Image src={a4} width="250px" height="auto" alt="ldsmdfkljfd" />
        </Col>
        <Col>
          <Image src={a3} width="250px" height="auto" alt="ldsmdfkljfd" />
        </Col>
      </Row>
      <Col>
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          renderButtonGroupOutside={true}
          arrows={false}
        >
          {cats.map((post) => (
            <Card
              style={{ width: "200px" }}
              cover={<img alt="sjdksjdl" src={post.image} />}
            ></Card>
          ))}
        </Carousel>
      </Col>
    </>
  );
}
