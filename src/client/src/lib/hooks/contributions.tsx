import {MutationOptions, useMutation, useQuery} from "@tanstack/react-query";
import {createContribution, getContributions} from "@/lib/api/contributions-service";
import {contributionsKeys} from "@/lib/api/key-factories";
import {PublishContribution} from "@/lib/types/contributions-types";

export const useContributions = () => {
    return useQuery({
        queryKey: contributionsKeys.contributions,
        queryFn: getContributions,
    });
}

export const useContributionsMutation = (
    options?: Omit<MutationOptions<PublishContribution, unknown, PublishContribution>, 'mutationKey' | 'mutationFn'>,
) =>
    useMutation({
        ...options,
        mutationKey: contributionsKeys.createContribution(),
        mutationFn: createContribution,
    });