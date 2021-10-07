import { Box, Link } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { Table, Tr, Th, Td } from "./Table";
import NextLink from "next/link";

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback </Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.id}>
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                <Link fontWeight="medium">{site.site}</Link>
              </NextLink>
            </Td>
            <Td>{site.url}</Td>
            <Td>
              <NextLink href="/feedback/[siteId]" as={`/feedback/${site.id}`} passHref>
                <Link color="blue.500" fontWeight="medium">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), "PPpp")}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
