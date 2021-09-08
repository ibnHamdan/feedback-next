import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb"
import { Flex, Heading } from "@chakra-ui/layout"

import AddSiteModal from "./AddSiteModel"

const SiteTableHeader = () => {
  return (
    <>

          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.7--">Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent="space-between">
          <Heading color="black" mb={4}>Sites</Heading>
          
          <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
    </>
  )
}

export default SiteTableHeader;