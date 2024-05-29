'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Text, Dialog, Button, TextArea } from "@radix-ui/themes";
import {PublishContribution} from "@/lib/types/contributions-types";
import { useQueryClient } from '@tanstack/react-query';
import {contributionsKeys} from "@/lib/api/key-factories";
import {useContributionsMutation} from "@/lib/hooks/contributions";
import {useProfile} from "@/lib/hooks/users";
import { findAndFilter } from 'swearify';

interface ContributionFormProps {
    setOpenModal: (open: boolean) => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ setOpenModal }) => {
    const queryClient = useQueryClient();

    const { data: profile, isLoading: isLoadingProfile } = useProfile();

    const { handleSubmit, register, setValue, formState, resetField } = useForm<PublishContribution>({
        defaultValues: {
            userId: profile?.id || '',
            text: '',
        },
    });

    const { mutateAsync: publishContribution } = useContributionsMutation({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: contributionsKeys.contributions,
            });
            new Notification('Obvestilo', {
                body: 'Prispevek je bil uspešno objavljen.',
                icon: '/icons/Icon-36.png',
            })
        },
        onError: (error) => {
            console.error(error);
            new Notification('Opozorilo', {
                body: 'Napaka pri objavljanju prispevka.',
                icon: '/icons/Icon-36.png',
            })
        }
    });


    const onSubmit = (data: PublishContribution) => {
        const result= findAndFilter(data.text, '*', ['sl', 'en'], [], []);

        if(profile?.id)
            publishContribution({...data, text: result?.filtered_sentense ?? data.text, userId: profile?.id});
            setOpenModal(false);
    };

    return (
        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Prispevek</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Objavite vaše mnenje ali opažanja...
            </Dialog.Description>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Vsebina
                        </Text>
                        <TextArea
                            placeholder="Tukaj vnesite..."
                            {...register('text')}
                            required={true}
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray" className="hover:cursor-pointer">
                            Prekliči
                        </Button>
                    </Dialog.Close>
                    <Button type="submit" className="hover:cursor-pointer">Objavi</Button>
                </Flex>
            </form>
        </Dialog.Content>
    );
}

export default ContributionForm;
