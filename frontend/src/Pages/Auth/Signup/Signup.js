import React, { useState } from "react";
import styles from "../index.module.css";
const Signup = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    name:""
  });
  const [cpassword, setCpassword] = useState("");

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    console.log(cpassword)
  }
  
  const google = () => {
    window.open("http://localhost:2000/socialauth/google/callback", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:3000/auth/facebook", "_self");
  };

  return (
    <div className={styles.login}>
      {/* <h1 className="loginTitle">Choose a Login Method</h1> */}
      <div className="d-flex align-items-center flex-column">
        <div
          className="d-flex flex-column align-items-center"
          style={{
            border: "1px solid black",
            borderRadius: "3px",
            padding: "20px",
            maxWidth: "530px",
          }}
        >
          <div className={styles.top}>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <input type="text" placeholder="full name" name="name" onChange={(e) => handleInput(e)} required />
              <input type="email" placeholder="email" name="email" onChange={(e) => handleInput(e)} required />
              <input type="password" placeholder="Password" name="password" onChange={(e) => handleInput(e)} required />
              <input type="text" placeholder="re-enter password" name="cPassword" onChange={(e)=>setCpassword(e.target.value)} required />
              <button className={styles.submit}>Signup</button>
            </form>
          </div>
          <div className={styles.center}>
            <div className={styles.line}></div>
            <div className={styles.or}>OR</div>
          </div>
          <div
            className={`${styles.bottom} d-flex`}
            style={{ marginTop: "20px", gap: "10px" }}
          >
            <div
              className={`${styles.loginButton} ${styles.google}`}
              onClick={google}
            >
              <img
                src="https://raw.githubusercontent.com/safak/youtube/react-social-login/client/src/img/google.png"
                alt=""
                className="icon"
              />
              Google
            </div>
            <div
              className={`${styles.loginButton} ${styles.facebook}`}
              onClick={facebook}
            >
              <img
                src="https://raw.githubusercontent.com/safak/youtube/react-social-login/client/src/img/facebook.png"
                alt=""
                className="icon"
              />
              Facebook
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
