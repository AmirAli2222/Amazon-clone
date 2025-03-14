import React, { useContext } from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import LowerHeader from "./LowerHeader";
import { auth } from "../../Utility/firebase"; // Import Firebase auth
import { Type } from "../../Utility/action.type"; // Import action type

const Header = () => {
  // Get `user` & `basket` from context
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Total items in the basket
  const basketCount = basket.reduce((total, item) => total + item.amount, 0);

  // Handle user sign-out
  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch({ type: Type.SET_USER, user: null }); // Clear user from context
    });
  };

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* Logo */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className={classes.search}>
            <select>
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>

          {/* Right Side Links */}
          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://image.shutterstock.com/image-vector/american-flag-usa-design-united-260nw-2479064985.jpg"
                alt="US Flag"
              />
              <select>
                <option value="EN">EN</option>
              </select>
            </Link>

            {/* Sign In / Sign Out */}
            {user ? (
              <div onClick={handleSignOut} className={classes.signOut}>
                <p>Hello, {user.email.split("@")[0]}</p>
                <span>Sign Out</span>
              </div>
            ) : (
              <Link to="/auth">
                <p>Sign In</p>
                <span>Account & Lists</span>
              </Link>
            )}

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/*  Cart with Dynamic Count */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{basketCount}</span> {/* Shows item count */}
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
