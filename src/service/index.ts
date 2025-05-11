import Axios, { AxiosError } from "axios";
export const IS_WEB = typeof window != "undefined";

const Api = Axios.create({
  baseURL: "/api",
});

Api.interceptors.request.use((config) => {
  if (IS_WEB) {
    config.headers.Server = window?.location?.origin;
  }

  return config;
});

Api.interceptors.response.use(
  ({ headers, data }) => {
    const total = headers["x-total-count"] || headers["x-wp-totalpages"];

    if (total != null) {
      return {
        total: parseInt(total),
        list: data,
      };
    }

    return data;
  },
  (error: AxiosError<{ message?: string }>) => {
    const message = error?.response?.data?.message || "Ocorreu um erro";
    return Promise.reject(new Error(message));
  }
);

export default Api;
