import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useCustomer = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: isCustomer, isPending: isCustomerLoading } = useQuery({
        queryKey: [user?.email, 'isCustomer'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/customer/${user.email}`)
            return res.data?.customer;
        },
        enabled: !!user?.email
    })
    return [isCustomer, isCustomerLoading]
};

export default useCustomer;