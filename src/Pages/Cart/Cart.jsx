import React, {useContext} from 'react'
import Layout from '../../Components/Layout/Layout'
// import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard';
import {Link} from 'react-router-dom';
import classes from './Cart.module.css'

function Cart() {
  const [{basket, user },dispatch] = useContext(DataContext)
  const total = basket.reduce((amount, item)=>{
     return item.price * item.amount + amount
  },0)
  // console.log(basket)
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps! No item in your Cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.lenght} items )</p>
              <CurrencyFormat amount={total}/>
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue To Checkout </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart