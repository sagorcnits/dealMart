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
        const res = await axiosFetch.get(`/orders?type=all`);
        return res.data || [];
      },
    });
  
    return [orders, refetch, isPending];
};

export default useOrders;