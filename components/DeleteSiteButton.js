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
const DeleteSiteButton = ({ siteId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const auth = useAuth();
  const onDelete = () => {
    deleteFeedback(siteId);
    mutate(
      ["/api/sites", auth.user._lat],
      async (data) => {
        console.log("removed ", siteId, data);
        if (data) {
          return {
            sites: data.sites.filter((site) => site.id !== siteId),
          };
        }
        console.log("removed no data");
        return {
          sites: null,
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
              Delete Site
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? This will delete all of site's feedback as well..</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button fontWeight="bold" colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteButton;
