import React, { useState } from "react";
import styles from "./homepage.module.css";
import { Link } from "react-router-dom";
import { requestWithToken } from "../../utils/httpRequest";
function Homepage(props) {
  const [showNav, setShowNav] = useState(false);
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
          <div className={`d-flex align-items-center gap-3`}>
            {" "}
            <i
              className={`${styles.navToggler} fas fa-bars `}
              onClick={() => setShowNav(!showNav)}
            ></i>
            <div className={styles.logo}>
              <Link to="/home" className="link">
                Coming Or Not{" "}
              </Link>
            </div>
          </div>

          <div className={styles.navOption}>
            <ul className="d-flex gap-3">
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
          <div
            className={`${styles.mobNav}  ${
              showNav ? styles.showmobNav : styles.hidemobNav
            }`}
          >
            <ul className="d-flex flex-column gap-2 justify-content-center">
              <Link to="/guests" className="link">
                <li onClick={() => setShowNav(false)}>
                  <div>Guest List</div>
                </li>
              </Link>
              <Link to="/events" className="link">
                <li onClick={() => setShowNav(false)}>
                  <div>Events</div>
                </li>
              </Link>
              <Link to="/event/create" className="link">
                <li onClick={() => setShowNav(false)}>
                  <div>+ Create Event</div>
                </li>
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
