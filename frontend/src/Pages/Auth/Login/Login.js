
import React, { useState } from "react";
import { requestWithToken } from "../../../utils/httpRequest";
import styles from "../index.module.css";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit =async (e) => {
    e.preventDefault();
    const result=await requestWithToken("POST", "/auth", form);
    if (result.data.status === 0) {
      window.localStorage.setItem("isLoggedIn", false);   
    }
    else {
      window.localStorage.setItem("isLoggedIn", true)
      window.location.replace("/home");
    }
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
          }}
        >
          <div className={styles.top}>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <input type="email" name="email" placeholder="Email" onChange={(e) => handleInput(e)} required/>
              <input type="password" name="password" placeholder="Password" onChange={(e) => handleInput(e)} required/>
              <button className={styles.submit}>Login</button>
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

export default Login;
