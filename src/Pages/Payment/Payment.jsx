import React, { useContext, useState } from 'react'
import classes from './Payment.module.css'
import Layout from '../../Components/Layout/Layout'
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import {
  useStripe,
  useElements,
  // PaymentElement,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import axios from 'axios';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import {db} from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const[{user, basket}]=useContext(DataContext);
  // console.log(user);

  const basketCount = basket.reduce((total, item) => total + item.amount, 0);

   const total = basket.reduce(
     (amount, item) => item.price * item.amount + amount,
     0
   );

  const [cardError, setCardError]= useState(null);
  const [processing, setProcessing]= useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate= useNavigate();
  
  const handleChange = (e)=>{
// console.log(e);
setCardError(e?.error?.message || "");
  };

  const handlePayment= async(e) =>{
    e.preventDefault()
    try{
      setProcessing(true)
      //1. backend || functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      //2.client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,

        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      // console.log(paymentIntent);

      //3.after the confirmation --> order firestone database save and clear basket

      await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      })

     setProcessing(false) 
     navigate("/orders", {state:{msg:"You have placed a new Order"}})

    } catch(error){
      console.log(error)
    setProcessing(false)
    }
    

  }


  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>
        Checkout ({basketCount}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}

        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user ? user.email : "Guest"}</div>
            <div>123 React Lane</div>
            <div>Fort Washington, MD</div>
          </div>
        </div>

        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing?(
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12}/>
                          <p> Please Wait ...</p>
                        </div>

                      ):"Pay Now"
                    }
                    
                    
                     </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
      </section>
    </Layout>
  );
}

export default Payment