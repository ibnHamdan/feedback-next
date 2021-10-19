import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites, getSite } from "@/lib/db-admin";
import { Box, FormControl, FormHelperText, FormLabel, Input, Button } from "@chakra-ui/react";
import { Router, useRouter } from "next/dist/client/router";
import { useRef, useState, useEffect } from "react";
import { createFeedback } from "@/lib/db";
import DashboardShell from "@/components/DashboardSell";
import SiteHeader from "@/components/SiteHeader";

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);
  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths(context) {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

const SiteFeedback = ({ initialFeedback, site }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      siteId,
      route: route || "/",
      author: auth.user.displayName,
      authorId: auth.user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      //provider: auth.user.provider,
      status: "pending",
    };
    inputEl.current.value = "";
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <DashboardShell>
      <SiteHeader isSiteOwner={true} site={site} siteId={siteId} />
      <Box display="flex" flexDirection="column" w="full">
        {auth.user && (
          <Box as="form" onSubmit={onSubmit}>
            <FormControl my={8} id="email">
              <FormLabel>Comment</FormLabel>
              <Input ref={inputEl} type="comment" id="comment" />
              <Button mt={2} type="submit" fontWeight="md" isDisabled={router.isFallback}>
                Add comment
              </Button>
            </FormControl>
          </Box>
        )}
        {allFeedback &&
          allFeedback.map((feedback) => <Feedback settings={site?.settings} key={feedback.id} {...feedback} />)}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
