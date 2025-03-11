import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import classes from "./Cart.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type"; // ✅ Import Correct Action Types
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello {user ? user.name : "Guest"}</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No items in your Cart</p>
          ) : (
            basket?.map((item) => (
              <div key={item.id} className={classes.cart__item}>
                {/* ✅ Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className={classes.cart__image}
                />

                {/* ✅ Product Details */}
                <div className={classes.cart__details}>
                  <h3>{item.title}</h3>

                  {/* ✅ Product Description */}
                  <p className={classes.description}>{item.description}</p>

                  {/* ✅ Show Rating */}
                  <div className={classes.rating}>
                    <Rating
                      value={item.rating?.rate}
                      precision={0.1}
                      readOnly
                    />
                    <small>({item.rating?.count} reviews)</small>
                  </div>

                  {/*  Show Price with Dollar Sign */}
                  <p className={classes.price}>${item.price.toFixed(2)}</p>

                  {/*  Add/Remove Buttons */}
                  <div className={classes.cart__buttons}>
                    <button
                      className={classes.remove_button}
                      onClick={
                        () =>
                          dispatch({
                            type: Type.REMOVE_FROM_BASKET,
                            id: item.id,
                          }) 
                      }
                    >
                       Remove
                    </button>

                    <div className={classes.quantity_control}>
                      <button
                        className={classes.arrow_button}
                        onClick={
                          () =>
                            dispatch({ type: Type.INCREMENT_ITEM, id: item.id }) 
                        }
                      >
                        <BiSolidUpArrow />
                      </button>
                      <span className={classes.item_quantity}>
                        {item.amount}
                      </span>
                      <button
                        className={classes.arrow_button}
                        onClick={
                          () =>
                            dispatch({ type: Type.DECREMENT_ITEM, id: item.id }) 
                        }
                      >
                        <BiSolidDownArrow />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Subtotal Section */}
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <p>
              Subtotal ({basket.length} items):{" "}
              <strong>💲{total.toFixed(2)}</strong>
            </p>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue To Checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
