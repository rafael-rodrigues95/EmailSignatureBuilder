import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const API_URL = "http://localhost:8090";

export function useFetchData(endpoint, queryKey) {
  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response;
  };

  const query = useQuery({
    queryFn: fetchData,
    queryKey: [queryKey],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

// Endpoints

export function useUnidadeData() {
  return useFetchData("units", "unidade-data");
}

export function useSetorData() {
  return useFetchData("departments", "setor-data");
}
