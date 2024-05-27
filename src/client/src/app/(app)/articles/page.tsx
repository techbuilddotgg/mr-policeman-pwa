'use client';

import {Container, Flex, Heading, Badge, IconButton, Dialog, Text} from '@radix-ui/themes';
import ContributionCard from "@/components/ui/contribution-card";
import LinkCard from "@/components/ui/link-card";
import {PlusIcon} from "lucide-react";
import React, { useState } from 'react';
import {useContributions} from "@/lib/hooks/contributions";
import ContributionForm from "@/components/ui/contribution-form";
import {useProfile} from "@/lib/hooks/users";

export default function ArticlesPage() {
    const { data: contributions, isLoading: isLoadingContributions } = useContributions();
    const { data: profile, isLoading: isLoadingProfile } = useProfile();

    const [isModalOpen, setModalOpen] = useState(false);
    const handleClick = () => {
        setModalOpen(true);
    };

  return (
      <Container size="1" className="mx-8 md:mx-24 my-12" align="left">
          <Badge color="blue" className="mb-2">Ne spreglej</Badge>
          <Heading className="mb-4">Koristne povezave</Heading>
          <Flex gap="1" direction="column" className="mb-12">
              <LinkCard name={"Stanje na slovenskih cestah 🛣️"} link={"https://www.amzs.si/na-poti/stanje-na-slovenskih-cestah"} />
              <LinkCard name={"Promet v živo 🚗"} link={"https://www.amzs.si/na-poti/nasveti-za-varno-pot"} />
              <LinkCard name={"Omejitve hitrosti po Evropi ⚠️"} link={"https://www.amzs.si/na-poti/stanje-na-slovenskih-cestah"} />
              <LinkCard name={"Nasveti za varno pot 💡"} link={"https://www.amzs.si/na-poti/nasveti-za-varno-pot"} />
              <LinkCard name={"Da neboš živčn 🎶"} link={"https://www.youtube.com/watch?v=r79ul2vhzpU"} />
          </Flex>

          <Heading className="mb-4">Prispevki</Heading>
          <Flex gap="4" direction="column" className="mb-40">
              {isLoadingContributions ? (
                  <Text as="div" size="4" weight="bold" color="gray" className="mb-2">Nalaganje prispevkov...</Text>
              ) : contributions!.length === 0 ? (
                  <Text as="div" size="4" weight="bold" color="gray" className="mb-2">Ni prispevkov.</Text>
              ) : (
                  contributions!.map((contribution) => (
                      <ContributionCard
                          key={contribution.id}
                          contributionId={contribution.id}
                          contributorName={contribution.userName}
                          date={contribution.createdAt}
                          contribution={contribution.text}
                          userName={profile?.username}
                      />
                  ))
              )}
          </Flex>

          <Dialog.Root>
              <Dialog.Trigger>
                  <IconButton radius="full" className="fixed right-14 bottom-14 hover:cursor-pointer f" size="4" onClick={handleClick}>
                      <PlusIcon />
                  </IconButton>
              </Dialog.Trigger>
              {isModalOpen && <ContributionForm setOpenModal={setModalOpen} />}
          </Dialog.Root>

      </Container>
  );
}
