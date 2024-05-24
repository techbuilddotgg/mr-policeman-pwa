import {Container, Flex, Heading, Badge, IconButton, Dialog, Text} from '@radix-ui/themes';
import ContributionCard from "@/components/ui/contribution-card";
import LinkCard from "@/components/ui/link-card";
import {PlusIcon} from "lucide-react";
import ContributionForm from "@/components/ui/contribution-form";
import {getContributions} from "@/lib/api/contributions-service";
import React from "react";

export default async function ArticlesPage() {
    //const { data: contributions } = useContributions();
    const contributions = await getContributions();
  return (
      <Container size="1" className="mx-24 my-12" align="left">
          <Badge color="blue" className="mb-2">Ne spreglej</Badge>
          <Heading className="mb-4">Koristne povezave</Heading>
          <Flex gap="1" direction="column" className="mb-12">
            <LinkCard name={"Da neboš živčn 🎶"} link={"https://www.youtube.com/watch?v=r79ul2vhzpU"} />
          </Flex>

          <Heading className="mb-4">Prispevki</Heading>
          <Flex gap="4" direction="column" className="mb-40">
              {contributions.length === 0 ? <Text as="div" size="4" weight="bold" color="gray" className="mb-2">Ni prispevkov.</Text> :
                  contributions.map((contribution) => (
                      <ContributionCard key={contribution.id} name={contribution.userName} date={contribution.createdAt} contribution={contribution.text} />
                  ))
              }
          </Flex>

          <Dialog.Root>
              <Dialog.Trigger>
                <IconButton radius="full" className="fixed right-14 bottom-14 hover:cursor-pointer f" size="4">
                    <PlusIcon />
                </IconButton>
              </Dialog.Trigger>
              <ContributionForm name={"Janez Novak"} />
          </Dialog.Root>

      </Container>
  );
}
