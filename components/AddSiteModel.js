import React, {useRef} from "react";
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
  Input,
  useDisclosure
} from "@chakra-ui/react"
import { createSite } from "../lib/db";


const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const { register, handleSubmit } = useForm();
  const onCreateSite = data => {
    createSite(data);
    onClose()
  };
  return (
    <>
    <Button onClick={onOpen} fontWeight="medium" maxW="200px">Add Your First Site</Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("site", { required: true})} ref={initialRef} placeholder="My site" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Line</FormLabel>
              <Input {...register("url", { required: true})} placeholder="https://website.com" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button type="submit" colorScheme="teal" >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal;