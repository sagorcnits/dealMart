import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import useAxios from './useAxios';

const useWishlists = () => {
    const user = useSelector((state) => state.user.user);
    const axiosFetch = useAxios()
    const {
        data: wishlists = [],
        refetch,
        isPending,
      } = useQuery({
        queryKey: ["wishlists"],
        queryFn: async () => {
          const res = await axiosFetch.get(`/wishlists?email=${user?.email}`);
          return res.data.data || [];
        },
      });
    
      return [wishlists, refetch, isPending];
};

export default useWishlists;