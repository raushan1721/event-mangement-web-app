import React from "react";
import styles from "./homepage.module.css";
import { Link } from "react-router-dom";
import { requestWithToken } from "../../utils/httpRequest";
function Homepage(props) {
  const handleLogout = async () => {
    const result = await requestWithToken("GET", "/auth/logout");
    if (result.data.status) {
      window.localStorage.removeItem("isLoggedIn");
      window.location.replace("/signin");
    }
  };
  return (
    <div className={styles.homepage}>
      <nav className={styles.navigation}>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/home" className="link">
            <div className={styles.logo}>Coming Or Not</div>
          </Link>
          <div className={styles.navOption}>
            <ul className="d-flex" style={{ gap: "10px" }}>
              <Link to="/guests" className="link">
                <li>Guest List</li>
              </Link>
              <Link to="/events" className="link">
                <li>Events</li>
              </Link>
              <Link to="/event/create" className="link">
              <li>+ create event</li>
              </Link>
            </ul>
          </div>

          <div className={styles.profile}>
            <p onClick={handleLogout}>logout</p>
          </div>
        </div>
      </nav>
      {<props.component />}
    </div>
  );
}

export default Homepage;
