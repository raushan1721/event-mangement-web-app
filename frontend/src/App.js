import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import  getPrivateRoutes  from './utils/getPrivateRoutes'
import authRoutes from "./routes/auth";
import home from './routes/home';
import getAuthRoutes from "./utils/getAuthRoutes";
import { requestWithToken } from "./utils/httpRequest";

function App() {

  useEffect(() => {
    const isLoggedIn = async () => {
      const result = await requestWithToken("GET", "/auth/isloggedin");
      if (!result.data) {
        window.localStorage.removeItem("isLoggedIn");
      }
      else {
        window.localStorage.setItem("isLoggedIn", true)
      }
    }
    isLoggedIn();
  }, []);
  
  return (
    <div>
      <Router>
        <Routes>

            {getAuthRoutes(authRoutes)}
          {getPrivateRoutes(home)}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
