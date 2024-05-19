import {useQuery} from "@tanstack/react-query";
import {getContributions} from "@/lib/api/contributions-service";
import { contributionsKeys} from "@/lib/api/key-factories";

export const useContributions = () => {
    return useQuery({
        queryKey: contributionsKeys.contributions,
        queryFn: getContributions,
    });
}