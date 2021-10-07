import { CalendarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useAuth } from "../lib/auth";
import NextLink from "next/link";

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex flexDirection="column">
      <Flex backgroundColor="white" alignItems="center" justifyContent="space-between" p={4}>
        <Stack isInline spacing={4} align="center">
          <NextLink href="/" passHref>
            <CalendarIcon color="black" size="24px" />
          </NextLink>
          <NextLink href="/sites" passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback </Link>
          </NextLink>
        </Stack>
        <Flex alignItems="center">
          <Link mr={4}>Acconts</Link>
          <Avatar size="sm" src={auth?.user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={12} h="100vh" height="100vh">
        <Flex maxWidth="800px" w="100%" maxW="800" ml="auto" mr="auto" direction="column">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
