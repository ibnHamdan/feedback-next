import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteFeedback } from "@/lib/db";
import { mutate } from "swr";
import { useAuth } from "@/lib/auth";
const RemoveButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const auth = useAuth();
  const onDelete = () => {
    //deleteFeedback(feedbackId);
    mutate(
      ["/api/feedback", auth.user._lat],
      async (data) => {
        return {
          feedback: data.feedback.filter((feedback) => feedback.id !== feedbackId),
        };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} aria-label="Search database" icon={<DeleteIcon />} variant="ghost" />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;
