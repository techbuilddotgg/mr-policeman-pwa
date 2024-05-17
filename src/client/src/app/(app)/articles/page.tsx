import {Container, Flex, Heading, Badge} from '@radix-ui/themes';
import ContributionCard from "@/components/ui/contribution-card";
import LinkCard from "@/components/ui/link-card";

export default function ArticlesPage() {
  return (
      <Container size="1" className="mx-24 my-12" align="left">
          <Heading className="mb-1">Koristne povezave</Heading>
          <Badge color="blue" className="mb-4">Ne spreglej</Badge>
          <Flex gap="1" direction="column" className="mb-12">
            <LinkCard name={"Da neboš živčn"} link={"https://www.youtube.com/watch?v=r79ul2vhzpU"} />
            <LinkCard name={"Da neboš živčn"} link={"https://www.youtube.com/watch?v=r79ul2vhzpU"} />
          </Flex>

          <Heading className="mb-4">Prispevki</Heading>
          <Flex gap="4" direction="column" className="mb-40">
              <ContributionCard name={"Janez Novak"} date={"17.05.2024"} contribution={"PAZI polocija!"} />
              <ContributionCard name={"Janez Novak"} date={"17.05.2024"} contribution={"PAZI polocija!"} />
              <ContributionCard name={"Janez Novak"} date={"17.05.2024"} contribution={"PAZI polocija!"} />
          </Flex>
      </Container>
  );
}
