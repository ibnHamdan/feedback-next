import { useAuth } from "@/lib/auth";

import { Button, Heading, Text, Code, Flex, Icon } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
export default function Home() {
  const auth = useAuth();
  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100vh">
      <Heading fontWeight="600">
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
        <title>Fast Feedback </title>
      </Heading>
      <CalendarIcon w={16} h={16} color="black"></CalendarIcon>

      {auth?.user ? (
        <Button mt={4} size="sm" onClick={(e) => auth.signout()}>
          Sign Out
        </Button>
      ) : (
        <>
          <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>
            Sign In with GitHub
          </Button>
          <Button mt={4} size="sm" onClick={(e) => auth.signinWithGoogle()}>
            Sign In with Google
          </Button>
        </>
      )}
    </Flex>
  );
}
