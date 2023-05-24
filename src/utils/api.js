import axios from "axios";
import store from "store2";

// Set config defaults when creating the instance
// const Instance = axios.create({
//   baseURL: import.meta.env.REACT_APP_BASE_URL,
// });

const Instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// Add a request interceptor
Instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = store.get("accessToken");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { status, data } = response;
    const { accessToken } = data;
    if (accessToken) store.set("accessToken", accessToken);
    return { status, data };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { response = {} } = error;
    const { data } = response;
    return Promise.reject(data);
  }
);

// Alter defaults after instance has been created

export default Instance;
