import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1",
});

export default AxiosInstance;
