import { Box } from "@chakra-ui/react";
import FeedbackRow from "./FeedbackRow";

import { Table, Tr, Th } from "./Table";

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Box overflow="scroll">
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
            <FeedbackRow {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
