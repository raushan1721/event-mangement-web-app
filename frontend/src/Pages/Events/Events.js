import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import { Link } from "react-router-dom";
import styles from "./events.module.css";

function Events() {
  const [active, setActive] = useState("current");
  const [data, setData] = useState({ current: [], past: [], upcoming: [] });

  useEffect(() => {
    const getData = async () => {
      const result = await requestWithToken("GET", `/event`);
      setData(result.data.data);

    };
    getData();
  }, []);

  return (
    <div className={styles.events}>
      <div className={styles.top}>
        <div className={`${styles.topWrapper} d-flex`}>
          <div
            className={styles.eventBtn}
            onClick={() => setActive("current")}
            style={
              active === "current"
                ? { background: "green", color: "#fff" }
                : { background: "inherit" }
            }
          >
            current<span> ({data.current.length})</span>
          </div>
          <div
            className={styles.eventBtn}
            onClick={() => setActive("upcoming")}
            style={
              active === "upcoming"
                ? { background: "orange", color: "black" }
                : { background: "inherit" }
            }
          >
            upcoming<span> ({data.upcoming.length})</span>
          </div>
          <div
            className={styles.eventBtn}
            onClick={() => setActive("past")}
            style={
              active === "past"
                ? { background: "red", color: "#fff" }
                : { background: "inherit" }
            }
          >
            past<span> ({data.past.length})</span>
          </div>
        </div>
      </div>

      <div className={styles.table}>
        <table >
          <tr>
            <th>SI.</th>
            <th>Occasion</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
          {data[active].map((d, index) => (
            <tr>
              <td>{index + 1}</td>
              <td><Link to={`/event/${d._id}`}>{d.title}</Link></td>
              <td>{d.address}</td>
              <td>{d.date}</td>
              <td>{d.time}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Events;
