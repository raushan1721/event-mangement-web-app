import axios from "axios";


const baseUrl = "http://localhost:2000";

// export const requestWithoutToken = async (method, endpoints, body) => {
//   let request;
//   const url = baseUrl + endpoints;

//   switch (method) {
//     case "GET":
//       request = await axios.get(url);
//       break;
//     case "POST":
//       request = await axios.post(url, body);
//       break;
//     case "PUT":
//       request = await axios.put(url, body);
//       break;
//     case "DELETE":
//       request = await axios.delete(url, body);
//       break;
//     default:
//       break;
//   }

//   return request;
// };

export const requestWithToken = async (method, endpoints, body) => {
  let request;
  const url = baseUrl + endpoints;
  const headers = {
    // "x-auth-token": localStorage.getItem("auth-token"),
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: "no-cache",
  };

  switch (method) {
    case "GET":
      request = await axios.get(url, { headers: headers ,withCredentials:true});
      break;
    case "POST":
      request = await axios.post(url, body, { headers: headers ,withCredentials:true});
      break;
    case "PUT":
      request = await axios.put(url, body, { headers: headers ,withCredentials:true});
      break;
    case "DELETE":
      request = await axios.delete(url, body, { headers: headers ,withCredentials:true});
      break;
    default:
      break;
  }

  return request;
};
