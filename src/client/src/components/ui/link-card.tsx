import React from 'react';
import {Box, Card, Text} from "@radix-ui/themes";

interface LinkCardProps {
    name: string;
    link: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ name, link }) => {
    return (
        <Box width={{ initial: "80vw", md: "50vw"}}>
            <Card asChild>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <Text as="div" size="2" weight="bold">
                        {name}
                    </Text>
                </a>
            </Card>
        </Box>
    );
}

export default LinkCard;
