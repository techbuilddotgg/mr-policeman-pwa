import React from 'react';
import {Box, Card, Flex, Text, Avatar} from "@radix-ui/themes";

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
                        <Text as="div" size="4" color="gray" weight="light">
                            {date}
                        </Text>
                        <Text as="div" size="4" weight="bold" >
                            {name}
                        </Text>
                        <Text as="div" size="4" color="gray">
                            {contribution}
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </Box>
    );
}

export default ContributionCard;
