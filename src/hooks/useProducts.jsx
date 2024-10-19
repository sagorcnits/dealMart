import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useProducts = () => {
  const axiosFetch = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return products;
};

export default useProducts;
