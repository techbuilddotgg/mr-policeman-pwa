import React from 'react';
import {Box, Card, Flex, Text, Avatar} from "@radix-ui/themes";
import {formatDate} from "@/lib/utils";

interface ContributionCardProps {
    name: string;
    date: string;
    contribution: string;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ name, date, contribution }) => {
    return (
        <Box width="60vw">
            <Card size="3">
                <Flex gap="4" align="center">
                    <Avatar size="5" radius="full" fallback={name ? name.charAt(0).toUpperCase() : "GS"} color="indigo" />
                    <Box>
                        <Text as="div" size="4" weight="bold" color="gray" className="mb-2">
                            {contribution}
                        </Text>
                        <Text as="div" size="3" color="gray" weight="light">
                            {name}, {formatDate(date)}
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </Box>
    );
}

export default ContributionCard;
