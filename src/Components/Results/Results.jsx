import { useState, useEffect } from 'React'
 import axios from "axios";
 import Layout from "../Layout/Layout";
 import { useParams } from "react-router-dom";
 import ProductCard from '../Product/ProductCard';
 import classes from "./../Product/Product.module.css";
 import Loader from '../Loader/Loader';
 function Results() {
   const { category } = useParams();
   const [Product, setProduct] = useState([]);
  const [Loading, setLoading] = useState(true)
   useEffect(() => {
     axios.get(`https://fakestoreapi.com/products/category/${category}`)
       .then((res) => {
         setProduct(res.data);
         setLoading(false)
       })
       .catch((err) => {
         console.log(err)
         setLoading(false) 
       });
   }, [])
   return (
     <Layout>
       {/* {
         Loading?(
             <Loader/>
         ):(
     
     <Layout>
       <div>
         <section className={classes.products_container}>
           {Product.map((item) => (
             <ProductCard product={item} />
           ))}
         </section>
       </div>
     </Layout>
 )} */}
       <section>
         <h1 style={{ padding: "30px" }}>Results</h1>
         <p style={{ padding: "30px" }}>Category/ {category}</p>
         <hr />
         <div className={classes.products_container}>
           {Product?.map((product)=> (
           <ProductCard
             key={product.id}
             product={product}
             renderDesc={false}
             renderAdd={true}
           />
           ))}
         </div>
       </section>
     </Layout>
   );
 }
 
 export default Results;