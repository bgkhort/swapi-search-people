import axios from "axios";

const apiInstance = (
  config = {
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
      "Content-type": "application/json",
    },
  }
) => {
  return axios.create(config);
};

export default apiInstance();
