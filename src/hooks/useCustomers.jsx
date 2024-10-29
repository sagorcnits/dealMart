import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
const useCustomers = () => {
  const axiosFetch = useAxios();

  const {
    data: customers = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axiosFetch.get(`/customers`);
      return res.data || [];
    },
  });

  return [customers, refetch, isPending];
};

export default useCustomers;
