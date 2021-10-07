import { useAuth } from "@/lib/auth";
import { updateFeedback } from "@/lib/db";
import { Box, Code, Switch } from "@chakra-ui/react";
import { useState } from "react";
import { mutate } from "swr";
import RemoveButton from "./RemoveButton";
import { Td } from "./Table";

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(status === "active");
  const toggleFeedback = async (e) => {
    //setChecked(!checked);
    await updateFeedback(id, { status: !checked ? "active" : "pending" });
    mutate(["/api/feedback", auth.user.token]);
  };
  return (
    <Box as="tr" key={id}>
      <Td fontWeight="bold">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || "/"}</Code>
      </Td>
      <Td>
        <Switch onChange={toggleFeedback} onClick={toggleFeedback} defaultChecked={status === "active"} />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
