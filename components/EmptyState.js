import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModel";
import DashboardShell from "./DashboardSell";


const EmptyState = () => {
  return(
    <Flex width="100%" backgroundColor="white" borderRadius="8px" p={16} justify="center" align="center" direction="column">
      <Heading size="lg" mb={2}>You haven`t added any sites</Heading>
      <Text mb={4}>Welcome</Text>
      <AddSiteModal>Add First Site</AddSiteModal>
    </Flex>
  )
}

export default EmptyState;