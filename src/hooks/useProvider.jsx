import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useProvider = () => {

    const {user} = useAuth();
    const axiosInstance = useAxios();
    
    const {data: isProvider, isPending: isProviderLoading} = useQuery({
        queryKey: [user?.email, 'isProvider'],
        queryFn: async()=>{
            const res = await axiosInstance.get(`/users/provider/${user.email}`)
            return res.data?.provider;
        },
        enabled: !!user?.email
    })
    return [isProvider, isProviderLoading]

};

export default useProvider;