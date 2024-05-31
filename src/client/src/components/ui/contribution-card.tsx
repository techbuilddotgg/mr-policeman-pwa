import React from 'react';
import {Box, Card, Flex, Text, Avatar, Button} from "@radix-ui/themes";
import {formatDate} from "@/lib/utils";
import {contributionsKeys} from "@/lib/api/key-factories";
import {useDeleteContributionMutation} from "@/lib/hooks/contributions";
import {useQueryClient} from "@tanstack/react-query";

interface ContributionCardProps {
    contributionId: string;
    contributorName: string;
    date: string;
    contribution: string;
    userName?: string;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ contributionId, contributorName, date, contribution, userName }) => {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteContribution } = useDeleteContributionMutation({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: contributionsKeys.contributions,
            });
            new Notification('Obvestilo', {
                body: 'Prispevek je bil uspešno izbrisan.',
                icon: '/icons/Icon-36.png',
            })
        },
        onError: (error) => {
            console.error(error);
            new Notification('Opozorilo', {
                body: 'Napaka pri brisanju prispevka.',
                icon: '/icons/Icon-36.png',
            })
        }
    });

    const handleDeleteContribution = async () => {
        await deleteContribution(contributionId);
    }

    return (
        <Box width={{ initial: "80vw", md: "60vw"}}>
            <Card className={userName === contributorName ? 'border-b-4 border-blue-500 relative py-6' : 'relative py-6'}>
                {userName === contributorName &&
                    <Button variant="soft" color="gray" className="hover:cursor-pointer absolute right-5" onClick={handleDeleteContribution}>X</Button>
                }
                <Flex gap="4" align="center">
                    <Avatar size="5" radius="full" className="self-start" fallback={contributorName ? contributorName.charAt(0).toUpperCase() : "GS"} color="indigo" />
                    <Box>
                        <Text weight="bold" color="gray" className="mb-2 block mr-12 sm:mr-20">
                            {contribution}
                        </Text>
                        <Text as="div" size="3" color="gray" weight="light">
                            {contributorName}, {formatDate(date)}
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </Box>
    );
}

export default ContributionCard;
