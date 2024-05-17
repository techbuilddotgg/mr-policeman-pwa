import React from 'react';
import {Flex, Text, Dialog, Button, TextArea} from "@radix-ui/themes";

interface ContributionFormProps {
    name: string;

}

const ContributionForm: React.FC<ContributionFormProps> = ({ name}) => {
    return (
        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Prispevek</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Objavite vaše mnenje ali opažanja...
            </Dialog.Description>
            <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Vsebina
                    </Text>
                    <TextArea placeholder="Tukaj vnesite..." />
                </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray" className="hover:cursor-pointer">
                        Prekliči
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button className="hover:cursor-pointer">Objavi</Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    );
}

export default ContributionForm;
