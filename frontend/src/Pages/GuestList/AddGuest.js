import React, { useState } from "react";
import Loader from "../../components/Loader";
import { requestWithToken } from "../../utils/httpRequest";
import styles from "./add.module.css";
function AddGuest() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    members: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(window.localStorage.getItem("user"))
    form.user = user.data.user;
    setIsLoading(true);
    await requestWithToken("POST", "/guest", form);
    setIsLoading(false);
  };
  return (
    <div className={styles.addGuest}>
      <p className={styles.title}>Create An event with family and friends</p>
      <div className={styles.form}>
        <form className={styles.create} onSubmit={(e) => handleSubmit(e)}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
              name="name"
              onChange={(e) => handleInput(e)}
              required
            />
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Address"
              name="address"
              onChange={(e) => handleInput(e)}
              required
            />
            <label for="floatingInput">Address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="Number of members"
              name="members"
              onChange={(e) => handleInput(e)}
              required
            />
            <label for="floatingInput">Number of members</label>
          </div>

          <button type="submit">{isLoading ? <Loader /> : "Add Guest"}</button>
        </form>
      </div>
    </div>
  );
}

export default AddGuest;
