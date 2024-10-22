import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useProducts = () => {
  const axiosFetch = useAxios();

  const {
    data: products = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosFetch.get(`/products`);
      return res.data;
    },
  });

  return [products, refetch, isPending];
};

export default useProducts;
