import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col, Typography, Card, Skeleton, Form, Empty } from "antd";

const { Text } = Typography;
const { Meta } = Card;
const posts = [1, 2, 3, 4, 5];
const renderSkeleton = posts.map((post) => {
  return (
    <Col>
      <Form layout="vertical">
        <Form.Item>
          <Skeleton.Input style={{ width: "200px", height: "150px" }} /> <br />
        </Form.Item>

        <Form.Item>
          <Skeleton.Input
            style={{ width: "150px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
        <Form.Item>
          <Skeleton.Input
            style={{ width: "200px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
      </Form>
    </Col>
  );
});

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

export default function CarouselItems() {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  console.log(posts);
  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Row justify="space-around" align="middle">
          {renderSkeleton}
        </Row>
      ) : error ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={error}
        ></Empty>
      ) : (
        <Carousel
          swipeable={true}
          draggable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
        >
          {posts.map((item) => (
            <Row>
              <Col item key={item.id}>
                <Link
                  to={`/product-detail/${item.id}/?category=${item.category}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{ height: "350px", border: "0" }}
                    cover={
                      <LazyLoadImage
                        src={item.image}
                        effect="blur"
                        alt="productimage"
                        style={{ width: "200px", height: "inherit" }}
                        // visibleByDefault={item.image}
                      />
                    }
                  >
                    <Meta title={item.product_name} description={item.shop} />{" "}
                    {/* <Rate name="size-small" defaultValue={item.ratings} /> */}
                    <Text style={{ color: "#f9812a" }}>ksh {item.price}</Text>
                  </Card>
                </Link>
              </Col>
            </Row>
          ))}
        </Carousel>
      )}
    </div>
  );
}
