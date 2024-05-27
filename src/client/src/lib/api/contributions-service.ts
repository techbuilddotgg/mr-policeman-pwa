import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';
import {Contribution, PublishContribution} from "@/lib/types/contributions-types";

export const getContributions = async () => {
    const { data } = await api.get(`${Endpoints.CONTRIBUTIONS}`);
    return data as Contribution[]
}

export const createContribution = async (contribution: PublishContribution) => {
    const { data } = await api.post(`${Endpoints.CONTRIBUTIONS}`, contribution);
    return data as Contribution;
}

export const deleteContribution = async (id: string) => {
    const { data } = await api.delete(`${Endpoints.CONTRIBUTIONS}/${id}`);
    return data as string;
}