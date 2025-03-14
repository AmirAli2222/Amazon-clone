import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Cart from "./Pages/Cart/Cart";
import Results from "./Components/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Orders from './Components/Orders/Orders'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51R1fgxBBS6sMvuFaYV9BOZyf9wCMWzKhLM5BVPwlzA3HGe2PXDyWCDYhQNHEE7KG0ogVlVW7BjoBx7d5Mrp7XgyN00YRThLpD4"
);

function Routing() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route
            path="/payments"
            element={
              <ProtectedRoute
                msg={"you must log in to pay"}
                redirect={"/payments"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must log in to see your orders"}
                redirect={"/orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/category/:category" element={<Results />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
