import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SignUp from "./Pages/Auth/Signup";
import Payment from "./Pages/Payment/Payment";
// import Orders from "./Components/Orders/Orders";
// import Cart from "./Pages/Cart/Cart";
// import Results from "./Components/Results/Results";
// import ProductDetail from "./Pages/ProductDetail/ProductDetail";


function Routing() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          {/* <Route path="/auth" element={<SignUp />}></Route>
          <Route path="/payments" element={<Payment />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/category/:category" element={<Results />} />
        <Route path="/products/:id" element={<ProductDetail/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
