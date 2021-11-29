import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import { useLocation } from "react-router-dom";
import styles from "./eventView.module.css";
import { Link } from "react-router-dom";
function EventView() {
  const id = useLocation().pathname.split("/")[2];
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await requestWithToken("GET", "/event/" + id);
      setData(result.data.data);
    };
    getData();
  }, [id]);

  const handleImport = async () => {
    const result = await requestWithToken("GET", "/guest");
    setTempData(result.data.data);
  };

  useEffect(() => {
    setData({ ...data, guests: data.guests?.concat(tempData) });
  }, [tempData]);
  const handleAdd = async () => {
    const guests = [];
    const eventId = data._id;
    data.guests.map((d) => guests.push(d._id));
    await requestWithToken("POST", "/event/guest", { eventId, guests });
  };

  const handleDelete = () => {};
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

        <div >
          <Link to={`/event/detail/${id}`} className="link">
            <div className={styles.link}>dashboard</div>
          </Link>
        </div>
      </div>
      <div className={`${styles.button} d-flex justify-content-center gap-3`}>
        <button onClick={handleAdd}>Add guest only for this occasion</button>
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
          </tr>
          {data.guests?.map((d, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{d.name}</td>
              <td>{d.address}</td>
              <td>{d.members}</td>
              <td
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={(e) => handleDelete(e, d._id)}
              >
                <i className="fas fa-trash"></i>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default EventView;
