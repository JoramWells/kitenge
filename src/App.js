import React, { Suspense, lazy } from "react";
import "./App.css";
import { Spin, Row, Col } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Top from "./components/Top";

const ManageProducts = lazy(() =>
  import("./components/Product/ManageProducts")
);
const AddProduct = lazy(() => import("./components/Product/AddProduct"));
const NavigationBar = lazy(() => import("./components/NavigationBar"));
const ProductDetail = lazy(() => import("./components/Product/ProductDetail"));
const Register = lazy(() => import("./components/Login/Register"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const Login = lazy(() => import("./components/Login/Login"));
const HomeRoutes = lazy(() => import("./components/HomeRoutes"));
const CartScreen = lazy(() => import("./components/CartScreen"));

function App() {
  return (
    <>
      <Top />

      <Suspense
        fallback={
          <Row
            justify="space-around"
            align="middle"
            style={{ padding: "15rem" }}
          >
            <Col>
              <Spin size="large" tip="Loading data..." />
            </Col>
          </Row>
        }
      >
        <NavigationBar />

        <Router>
          <Switch>
            <Route path="/" exact component={HomeRoutes} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/checkout" component={Checkout} />
            <Route
              path="/product-detail/:id?"
              exact
              component={ProductDetail}
            />
            <Route path="/products/add" exact component={AddProduct} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/product/manage" exact component={ManageProducts} />
          </Switch>
        </Router>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
