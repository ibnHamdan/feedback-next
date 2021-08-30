import { CalendarIcon } from "@chakra-ui/icons"
import { Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading, Icon, Link, Stack } from "@chakra-ui/react"
import { useAuth } from "../lib/auth"
import  AddSiteModal  from "@/components/AddSiteModel";

const DashboardShell = ({children}) =>  {
  const auth = useAuth();
  return (
  <Flex flexDirection="column">
    <Flex
      backgroundColor="white"
      alignItems="center"
      justifyContent="space-between"
      p={4}
    >
      <Stack isInline spacing={4} align="center">
        <CalendarIcon color="black" size="24px" />
        <Link>Feedback </Link>
        <Link>Sites</Link>
      </Stack>
      <Flex alignItems="center">
        <Link mr={4}>Acconts</Link>
        <Avatar size="sm" src={auth?.user?.photoURL}/>
      </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={12} h="100vh" height="100vh">
        <Flex
          maxWidth="800px"
          w="100%"
          maxW="800"
          ml="auto"
          mr="auto"
          direction="column"
        >
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.7--">Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent="space-between">
          <Heading color="black" mb={4}>Sites</Heading>
          
          <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          
          {children}
        </Flex>
      </Flex>

    
  </Flex>
  )
}

export default DashboardShell