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
  Empty,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import { categoryProduct, detailsProduct } from "../../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    <Col style={{ padding: "20px" }}>
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
              style={{ width: "300px" }}
            />
          </Col>

          <Col xs={24} md={8} style={{ padding: "20px" }}>
            <Title level={3}>{product.product_name}</Title>
            <Rate disabled allowHalf defaultValue={product.ratings} />

            <Title level={5}>
              <Divider plain></Divider>
              Price: ksh{" "}
              <span style={{ color: "#CD5C5C" }}>{product.price}</span>
            </Title>
            <Title level={5}>
              Sold By:
              <span style={{ color: "#588BAE" }}> {product.shop}</span>
            </Title>
            <Title level={5}>Categorys': {product.category}</Title>
            <Title level={5}>Qty: </Title>
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
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ border: "none" }}>
              <Title level={3}>Description</Title>
              <Text>{product.description}</Text>
            </Card>
          </Col>
        </Row>
      )}
      <RecentItemsBar title="Related Items" />
      {loadingCategory ? (
        <div>Loading..</div>
      ) : errorCategory ? (
        <div>{errorCategory}</div>
      ) : (
        <div>
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
          >
            {products.length === 0 ? (
              <Row justify="space-around" align="middle">
                <Col>
                  <Empty description="No category"></Empty>
                </Col>
              </Row>
            ) : (
              products.map((item) => (
                <Row justify="space-around" align="middle">
                  <Col item key={item.id}>
                    <a
                      href={`/product-detail/${item.id}/?category=${item.category}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{ height: "350px", border: "0" }}
                        cover={
                          <LazyLoadImage
                            src={item.image}
                            alt="productimage"
                            style={{
                              width: "200px",
                            }}
                          />
                        }
                      >
                        <Meta
                          title={item.product_name}
                          description={item.shop}
                        />

                        <Text level={3}>ksh {item.price}</Text>
                      </Card>
                    </a>
                  </Col>
                </Row>
              ))
            )}
          </Carousel>
        </div>
      )}
    </Col>
  );
}
