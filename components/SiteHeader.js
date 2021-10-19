import { Box, Breadcrumb, BreadcrumbLink, BreadcrumbItem, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import AddSiteModal from "./AddSiteModel";
import EditSiteModal from "./EditSiteModal";

const SiteHeader = ({ isSiteOwner, site, siteId, route }) => {
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href={`/sites/${siteId}`} passHref>
            <BreadcrumbLink>{site?.site || "-"}</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {site && route && (
          <BreadcrumbItem>
            <NextLink href={`/sites/${siteId}/${route}`} passHref>
              <BreadcrumbLink>{route}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{site?.site || "-"}</Heading>
        {isSiteOwner && (
          <EditSiteModal siteId={siteId} settings={site?.settings}>
            Edit Site
          </EditSiteModal>
        )}
      </Flex>
    </Box>
  );
};

export default SiteHeader;
