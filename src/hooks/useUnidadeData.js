import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const API_URL = 'http://localhost:8090'

const fetchData = async () => {
    const response = axios.get(API_URL +  '/signature');
    return response;
}

export function useUnidadeData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['unidade-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}