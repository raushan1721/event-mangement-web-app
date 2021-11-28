import React, { useState } from "react";
import { requestWithToken } from "../../../utils/httpRequest";
import styles from "../index.module.css";
import { GoogleLogin } from "react-google-login-include-granted-scopes";

const Signup = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    name:""
  });
  const [cpassword, setCpassword] = useState("");

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
      e.preventDefault();
    if (form.password===cpassword) {
      const result = await requestWithToken("POST", "/user", form);
      if (result.data.status === 0) {
      } else {
        window.location.replace("/signin");
      }
    }
    else {
      alert("password not match")
    }
    };
  
    const google = async (googleData) => {
      console.log(googleData)
       const result=await requestWithToken("POST","/socialauth/google", {
        token: googleData.tokenId,
      });
      if (result.data.status === 0) {
        window.localStorage.setItem("isLoggedIn", false);
      } else {
        window.localStorage.setItem("isLoggedIn", true);
        window.location.replace("/home");
      }
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
            className={`${styles.bottom} d-flex flex-column flex-sm-row gap-2`}
            style={{ marginTop: "20px", gap: "10px" }}
          >
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className={`${styles.loginButton} ${styles.google}`}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {" "}
                  <img
                    src="https://raw.githubusercontent.com/safak/youtube/react-social-login/client/src/img/google.png"
                    alt=""
                    className="icon"
                  />
                  Google
                </button>
              )}
              onSuccess={google}
              onFailure={google}
              cookiePolicy={"single_host_origin"}
            />
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
