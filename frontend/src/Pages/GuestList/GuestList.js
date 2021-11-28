import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import { Link } from "react-router-dom";
import styles from "./guestList.module.css";
function GuestList() {
  const [guests, setGuests] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const guestList = async () => {
      const result = await requestWithToken("GET", "/guest");
      setGuests(result.data.data);
      // setIsLoading(false);
    };
    guestList();
  }, []);

  const handleDelete = async (e,id) => {
    e.preventDefault();
    await requestWithToken("POST","/guest/"+id)
  };
  return (
    <div className={styles.guests}>
      <Link to="/guest/new">
        <button className={styles.addBtn}>+ Add Guest</button>
      </Link>
      <div className={styles.table}>
        <table>
          <tr>
            <th>SI.</th>
            <th>Name</th>
            <th>Address</th>
            <th>members</th>
            <th>del</th>
          </tr>
          {guests?.map((d, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{d.name}</td>
              <td>{d.address}</td>
              <td>{d.members}</td>
              <td
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={(e) => handleDelete(e, d._id)}
              >
                <i class="fas fa-trash"></i>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default GuestList;
