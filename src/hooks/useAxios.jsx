import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxios = () => {
  return axiosFetch;
};

export default useAxios;
