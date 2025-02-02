import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "https://dealmart-server-88fs.onrender.com/",
});

const useAxios = () => {
  return axiosFetch;
};

export default useAxios;
