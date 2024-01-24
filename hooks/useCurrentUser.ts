import useSWR from "swr"; /*data fetching package*/
import fetcher from "@/lib/fetcher";

const useCurrentUSer = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  }
};
export default useCurrentUSer;
