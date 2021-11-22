import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import { useLocation } from "react-router-dom";
import styles from "./eventView.module.css";
function EventView() {
  const id = useLocation().pathname.split("/")[2];
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const result = await requestWithToken("GET", "/event/" + id);
      setData(result.data.data);
    };
    getData();
  }, [id]);

  const handleImport = async () => {
    const result = await requestWithToken("GET", "/guest");
    data.guests=data.guests.concat(result.data.data);
    setData(data);
  };

  return (
    <div className={styles.eventView}>
      <div className={styles.top}>
        <div>
          <p className={styles.title}>{data.title}</p>
          <p
            className={`${styles.info} d-flex justify-content-center gap-4 gap-md-5`}
          >
            <span>{data.address}</span>
            <span>{data.date}</span>
            <span>{data.time}</span>
          </p>
        </div>
        <div className={styles.link}>asdfadsf</div>
      </div>
      <div className={`${styles.button} d-flex justify-content-center gap-3`}>
        <button>Add guest only for this occasion</button>
        <button onClick={(e) => handleImport(e)}>
          + import guests from guestList
        </button>
      </div>

      <div className={styles.list}>
        <table>
          <tr>
            <th>SI.</th>
            <th>Name</th>
            <th>Address</th>
            <th>members</th>
            <th>del</th>
            <th>{data.guests?.length}</th>
          </tr>
          {data.guests?.map((d, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{d.name}</td>
              <td>10:02</td>
              <td>10:02</td>
              <td>10:02</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default EventView;
