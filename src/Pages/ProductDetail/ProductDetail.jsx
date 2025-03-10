import React ,{useEffect ,useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';
ProductCard
function ProductDetail() {
    const {id } =  useParams()
 const [singlePro, setSinglePro] = useState([]);
 const [loading, setLoading] = useState(true)

 useEffect(() => {
   axios
     .get(`https://fakestoreapi.com/products/${id}`)
     .then((res) => {
       setSinglePro(res.data)
       setLoading(false)
     })
     .catch((err) =>{
        console.log(err)
        setLoading(false)
     }
    )

 }, []);
 return (
   <>
     {loading ? (
       <Loader/>
     ) : (
       <Layout>
         <div>
           <section>
             <ProductCard product={singlePro} flex={true} isDesc={true} renderAdd={true}/>
           </section>
         </div>
       </Layout>
     )}
   </>
 );
}

export default ProductDetail