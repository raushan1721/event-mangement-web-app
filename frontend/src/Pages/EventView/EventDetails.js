import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import styles from "./eventDetails.module.css";
import { useLocation } from "react-router-dom";

function EventDetails() {
  const [data, setData] = useState([]);
  const id = useLocation().pathname.split("/")[3];
  const link = "http://localhost:3000/event/detail/619e794101e44cd7e0e2aea8";
  useEffect(() => {
    const fetchData = async () => {
      const result = await requestWithToken("GET", "/event/" + id);
      setData(result.data.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.eventDetails}>
      <div className={`${styles.top} d-flex justify-content-between gap-3 `}>
        <div>
          <p className={styles.title}>{data.title}</p>
          <p className={styles.subtitle}>
            <span>{data.address}, </span>
            <span>
              {data.date}
              {"  "}
            </span>
            <span>
              {"  "}
              {data.time}
            </span>
          </p>
        </div>
        <div>
          <div className={styles.link}>
            <p>Copy link to share</p>
            <div
              className={`d-flex justify-content-between align-items-center gap-2`}
            >
              <p style={{ background: "rgb(234, 234, 234)", marginTop: "5px" }}>
                {link}
              </p>
              <i className="far fa-copy" style={{fontSize:"1.3em",cursor:"pointer"}}></i>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.countBox}>
        <div className={styles.box}>
          <div className={styles.name}>No. of people invited</div>
          <div className={styles.count}>25</div>
        </div>
        <div className={styles.box}>
          <div className={styles.name}>No. of people invited</div>
          <div className={styles.count}>25</div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
