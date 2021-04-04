import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Divider,
  Rate,
  Image,
  Skeleton,
  Form,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import { categoryProduct, detailsProduct } from "../../_actions/productActions";
import RecentItemsBar from "../RecentItemsBar";
const { Meta } = Card;
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

const { Title, Text } = Typography;

export default function ProductDetail(props) {
  const productDetail = useSelector((state) => state.productDetail);
  const categoryDetail = useSelector((state) => state.categoryList);

  const [qty, setQty] = useState(1);
  const { product, loading, error } = productDetail;
  const { loadingCategory, products, errorCategory } = categoryDetail;
  const search = props.location.search;
  const params = new URLSearchParams(search);
  const name = params.getAll("category");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    dispatch(categoryProduct(name));
    return () => {};
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };
  console.log(products);

  return (
    <>
      {loading ? (
        <Row justify="space-around" align="middle" style={{ padding: "2rem" }}>
          <Col>
            <Skeleton.Image style={{ width: "300px", height: "300px" }} />
          </Col>
          <Col>
            <Form>
              <Form.Item>
                <Skeleton.Input style={{ width: "400px" }} />
              </Form.Item>
              <Form.Item>
                <Skeleton.Input style={{ width: "200px" }} />
              </Form.Item>
              <Form.Item>
                <Skeleton.Input style={{ width: "350px" }} />
              </Form.Item>
            </Form>
          </Col>
          <Col>
            <Skeleton.Input style={{ width: "300px", height: "300px" }} />
          </Col>
        </Row>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row style={{ padding: "20px" }} justify="space-around" align="middle">
          <Col xs={24} md={8}>
            <Image
              src={product.image}
              alt="shoes again"
              style={{ width: "250px" }}
            />
          </Col>

          <Col xs={24} md={8} style={{ padding: "20px" }}>
            <Title level={3}>{product.product_name}</Title>
            <Rate disabled allowHalf defaultValue={product.ratings} />

            <Title level={5}>
              <Divider plain></Divider>
              Ksh: {product.price}
            </Title>
            <Title level={5}>
              Sold By:
              <span style={{ color: "#588BAE" }}> {product.shop}</span>
            </Title>
            <Divider plain></Divider>
            {product.stock > 0 ? (
              <Row justify="space-around">
                <Button
                  style={{ display: "inline-block" }}
                  block
                  onClick={handleAddToCart}
                  type="link"
                >
                  <Title
                    level={5}
                    className="cart"
                    style={{ padding: "0.5rem" }}
                  >
                    ADD PRODUCT TO CART
                  </Title>
                </Button>
              </Row>
            ) : (
              <div>Out of Stock</div>
            )}

            <Divider plain></Divider>
            <Title level={4}>Categories: </Title>
            <Text>{product.categories}</Text>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ border: "none" }}>
              <Text level={3}>
                Paid delivery, free delivery on Wednesdays, Fridays{" "}
              </Text>

              <Title level={5}>Coupouns</Title>

              <Text>Qty: </Text>
              <select
                defaultValue={qty}
                style={{ width: 120 }}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {[...Array(product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </Card>
          </Col>
          <Row justify="space-around" align="middle">
            <Col>
              <Title level={4}>Description</Title>
              <Text>{product.description}</Text>
            </Col>
          </Row>
        </Row>
      )}
      <RecentItemsBar title="Related Items" />
      {loadingCategory ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{errorCategory}</div>
      ) : (
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
        >
          {products.map((item) => (
            <Row>
              <Col item key={item.id}>
                <a
                  href={`/product-detail/${item.id}/?category=${item.category}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{ height: "350px", border: "0" }}
                    cover={
                      <img
                        src={item.image}
                        alt="productimage"
                        style={{ maxWidth: "75%", height: "180px" }}
                      />
                    }
                  >
                    <Meta title={item.product_name} description={item.shop} />

                    {/* <Rate name="size-small" defaultValue={item.ratings} /> */}

                    <Text level={3}>ksh {item.price}</Text>
                  </Card>
                </a>
              </Col>
            </Row>
          ))}
        </Carousel>
      )}
    </>
  );
}
