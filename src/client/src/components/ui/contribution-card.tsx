import React from 'react';
import {Box, Card, Flex, Text, Avatar} from "@radix-ui/themes";
import {formatDate} from "@/lib/utils";

interface ContributionCardProps {
    contributorName: string;
    date: string;
    contribution: string;
    userName?: string;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ contributorName, date, contribution, userName }) => {
    return (
        <Box width="60vw">
            <Card size="3" className={userName === contributorName ? 'border-b-4 border-blue-500' : ''}>
                <Flex gap="4" align="center">
                    <Avatar size="5" radius="full" fallback={contributorName ? contributorName.charAt(0).toUpperCase() : "GS"} color="indigo" />
                    <Box>
                        <Text as="div" size="4" weight="bold" color="gray" className="mb-2">
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
