import {Container, Flex, Heading} from '@radix-ui/themes';
import ContributionCard from "@/components/ui/contribution-card";

export default function ArticlesPage() {
  return (
      <Container size="1" className="ml-12 mt-12" align="left">
        <Heading className="mb-4">Prispevki</Heading>
          <Flex gap="4" direction="column">
              <ContributionCard name={"Janez Novak"} date={"17.05.2024"} contribution={"PAZI polocija!"} />
              <ContributionCard name={"Janez Novak"} date={"17.05.2024"} contribution={"PAZI polocija!"} />
              <ContributionCard name={"Janez Novak"} date={"17.05.2024"} contribution={"PAZI polocija!"} />
          </Flex>
      </Container>
  );
}
