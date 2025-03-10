import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'

function Product() {
    const [Loading, setLoading] = useState(true);
    const [products, setProducts] = useState()
    useEffect(()=>{
        axios.get("https://fakestoreapi.com/Products")
        .then((res)=>{
            setProducts(res.data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
        })

    },[])
  return (
    <>
        <section className={classes.products_container}>
          {products?.map((singleProduct, i) => (
            <ProductCard renderAdd={true} key={i} product={singleProduct} />
          ))}
        </section>
    </>
  );
}

export default Product