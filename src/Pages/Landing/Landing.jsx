import React from "react";
import CarouselEffect from "../../Components/Carousel/Carousel";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";
import Layout from "../../Components/Layout/Layout";

function Landing() {
  return (
    <>
      <Layout>
        <h1 style={{ color: "red", fontSize: "30px" }}>
      </h1>{" "}
      <CarouselEffect />
      <Category />
      <Product />
      </Layout>
    </>
  );
}

export default Landing;
