import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { Box, FormControl, FormHelperText, FormLabel, Input, Button } from "@chakra-ui/react";
import { Router, useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { createFeedback } from "@/lib/db";
import DashboardShell from "@/components/DashboardSell";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths(context) {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const onSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: auth.user.displayName,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
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
        {allFeedback && allFeedback.map((feedback) => <Feedback key={feedback.id} {...feedback} />)}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
