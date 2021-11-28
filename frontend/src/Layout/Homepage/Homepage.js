import React from "react";
import styles from "./homepage.module.css";
import { Link } from "react-router-dom";
import { requestWithToken } from "../../utils/httpRequest";
function Homepage(props) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const handleLogout = async () => {
    const result = await requestWithToken("GET", "/auth/logout");
    if (result.data.status) {
      window.localStorage.removeItem("userv");
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
            <div className="dropdown">
              <div
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className={styles.profileImage}
                  src={user.data.image}
                  alt=""
                />
              </div>
              <div
                className={`${styles.dropdown} dropdown-menu `}
                aria-labelledby="dropdownMenuButton1"
              >
                <div className="d-flex flex-column align-items-center">
                  <img
                    className={styles.innerImage}
                    src={user.data.image}
                    alt=""
                  />
                  <p className={styles.username}>{user.data.name}</p>
                  <p className={styles.email}>{user.data.email}</p>
                  <Link to="/profile/edit">
                    <button className={styles.edit}>edit profile</button>
                  </Link>
                  <button className={styles.logout} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {<props.component />}
    </div>
  );
}

export default Homepage;
