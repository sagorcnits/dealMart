import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useOrders = () => {
    const axiosFetch = useAxios();

    const {
      data: orders = [],
      refetch,
      isPending,
    } = useQuery({
      queryKey: ["orders"],
      queryFn: async () => {
        const res = await axiosFetch.get(`/orders`);
        return res.data.orders || [];
      },
    });
  
    return [orders, refetch, isPending];
};

export default useOrders;