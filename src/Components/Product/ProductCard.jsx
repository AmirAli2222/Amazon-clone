import React, { useContext } from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
// import { DataContext } from '../DataProvider/DataProvider';
// import {Type} from '../../Utility/action.type'

function ProductCard({ product, flex, isDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  // const [state, dispatch] = useContext(DataContext);
  // const addToCart = () => {
  //   dispatch({
  //     type: Type.ADD_TO_BASKET,
  //     item: { image, title, id, rating, price, description },
  //   });
  // };

  return (
    <div
      className={`${classes.card__container} ${
        isDesc && classes.product_flexed
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {isDesc && (
          <div style={{ maxWidth: "700px" }}>
            <p>{description}</p>
          </div>
        )}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && <button className={classes.button}>add to cart</button>}
      </div>
    </div>
  );
}

export default ProductCard