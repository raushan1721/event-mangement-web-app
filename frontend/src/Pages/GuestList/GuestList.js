import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import MaterialTable from "material-table";
import { tableIcons } from "../../components/MaterialTableUtils";
import styles from './guestList.module.css'
function GuestList() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const guestList = async () => {
      const result = await requestWithToken("GET", "/guest");
      setGuests(result.data.data);
      setIsLoading(false);
    };
    guestList();
  }, []);
  const columns=[
    {
      title: "SI",
      field: "",
      cellStyle: {
        minWidth: 50,
        width: "10%",
      }
    },
    {
      title: "Name",
      field: "name",
      cellStyle: {
        minWidth: 200,
        width: "30%",
      }
    },
    {
      title: "Address",
      field: "address",
      cellStyle: {
        minWidth: 400,
        width: "50%",
      }
    },
    {
      title: "Members",
      field: "members",
      cellStyle: {
        minWidth: 50,
        width: "10%",
      }
    },
  ]
 
  return (
    <div className={styles.guests}>
       <MaterialTable
        isLoading={isLoading}
        columns={columns}
        data={guests}
        title="Guest List"
        icons={tableIcons}
        options={{
          tableLayout: "auto",
          maxBodyHeight: "65vh",
        }}
      /> 
    </div>
  );
}

export default GuestList;
