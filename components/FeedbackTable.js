import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Code, IconButton, Link, Switch } from "@chakra-ui/react";
import RemoveButton from "./RemoveButton";
import { Table, Tr, Th, Td } from "./Table";

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback </Th>
          <Th>Feedback Link</Th>
          <Th>Route</Th>
          <Th>Visible </Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="bold">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{"/"}</Code>
            </Td>
            <Td>
              <Switch defaultChecked={feedback.status === "active"} />
            </Td>
            <Td>
              <RemoveButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
