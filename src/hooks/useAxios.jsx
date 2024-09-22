import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "https://dealmart-server-neon.vercel.app/",
});

const useAxios = () => {
  return axiosFetch;
};

export default useAxios;
