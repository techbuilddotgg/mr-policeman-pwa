import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';
import {Contribution} from "@/lib/types/contributions-types";

export const getContributions = async () => {
    const { data } = await api.get(`${Endpoints.CONTRIBUTIONS}`);
    return data as Contribution[]
}