import React, { useContext, useState } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData= useLocation()
  console.log(navStateData)

  const authHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error state before making a request

    if (e.target.name === "signin") {
      try {
        setLoading((prev) => ({ ...prev, signIn: true }));

        // **Sign in user**
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // **Dispatch user info to global context**
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        // **Redirect to Home Page**
        navigate(navStateData?.state?.redirect || "/");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, signIn: false })); // Always set loading back to false
      }
    } else {
      try {
        setLoading((prev) => ({ ...prev, signUp: true }));

        // **Create a new user**
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // **Dispatch new user info**
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });

        // **Redirect to Home Page**
        navigate(navStateData?.state?.redirect || "/");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, signUp: false })); // ✅ Always set loading back to false
      }
    }
  };

  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG3.png"
          alt="Amazon Logo"
        />
      </Link>

      {/* Form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="button"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
            disabled={loading.signIn} // Prevent multiple clicks
          >
            {loading.signIn ? (
              <ClipLoader color="#febd69" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>

        {/* Create Account Button */}
        <button
          type="button"
          name="signup"
          onClick={authHandler}
          className={classes.login__registerButton}
          disabled={loading.signUp} // Prevent multiple clicks
        >
          {loading.signUp ? (
            <ClipLoader color="#febd69" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

