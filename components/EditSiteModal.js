import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  Switch,
} from "@chakra-ui/react";
import { updateSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { mutate } from "swr";

const EditSiteModal = ({ settings, siteId, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const auth = useAuth();

  const onEditSite = async (fields) => {
    await updateSite(siteId, {
      settings: fields,
    });
    // toast({
    //   title: "Success.",
    //   description: "We've update your site.",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
    mutate(["/api/sites", auth.user._lat]);
    onClose();
  };
  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.700"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader>Edite Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display="flex" alignItems="center">
              <Switch
                key={settings?.timestamp}
                defaultChecked={settings?.timestamp}
                {...register("timestamp", { required: false })}
                id="show-timestamp"
              />
              <FormLabel ml={2} htmlFor="show-timestamp" mb="0">
                Show Timestamp
              </FormLabel>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <Switch
                key={settings?.icons}
                defaultChecked={settings?.icons}
                {...register("icon", { required: false })}
                id="show-icon"
              />
              <FormLabel ml={2} htmlFor="show-icon" mb="0">
                Show Icon
              </FormLabel>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <Switch
                key={settings?.ratings}
                defaultChecked={settings?.ratings}
                {...register("ratings", { required: false })}
                id="show-ratings"
              />
              <FormLabel ml={2} htmlFor="show-ratings" mb="0">
                Show Ratings
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSiteModal;
