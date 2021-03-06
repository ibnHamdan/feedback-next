import { useAuth } from "@/lib/auth";

import { Stack, Link, Box, Button, Heading, Text, Code, Flex, Icon } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import Head from "next/head";
import { getAllFeedback } from "@/lib/db-admin";
import FeedbackLink from "@/components/FeedbackLink";
import Feedback from "@/components/Feedback";

const SITE_ID = "0zYpD50HGlumYnp5lJhz";
export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
    },
    //unstable_revalidate: 1,
  };
}

const Home = ({ allFeedback }) => {
  const auth = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/sites"
              }
            `,
              }}
            />
            <title>Fast Feedback</title>
          </Head>
          <CalendarIcon color="black" name="logo" size="48px" mb={2} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>

            {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/sites"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <Stack isInline>
              <Button
                onClick={(e) => auth.signinWithGitHub()}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon="github"
                mt={4}
                _hover={{ bg: "gray.700" }}
                _active={{
                  bg: "gray.800",
                  transform: "scale(0.95)",
                }}
              >
                Sign In with GitHub
              </Button>
              <Button
                onClick={(e) => auth.signinWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                leftIcon="google"
                mt={4}
                _hover={{ bg: "gray.100" }}
                _active={{
                  bg: "gray.100",
                  transform: "scale(0.95)",
                }}
              >
                Sign In with Google
              </Button>
            </Stack>
          )}
        </Flex>
      </Box>
      <Box display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto" mt={8}>
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback?.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  );
};
export default Home;
