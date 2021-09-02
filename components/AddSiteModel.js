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
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { createSite } from "../lib/db";
import { useAuth } from "../lib/auth";
import { mutate } from "swr";
import fetcher from "@/utils/fetcher";


const AddSiteModal = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const { register, handleSubmit } = useForm();
  const toast = useToast()
  const auth = useAuth();
  

  const onCreateSite = ({site, url}) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      site,
      url
    }
    createSite(newSite);
    toast({
      title: "Site created.",
      description: "We've created your site for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    mutate(['/api/sites', auth.user._lat], async (data) => {
      return { sites: [...data.sites, newSite]}
    }, false)
    onClose()
  };
  return (
    <>
    <Button onClick={onOpen}
            backgroundColor="gray.700"
            color="white"
            fontWeight="medium"
            _hover={{bg: 'gray.700'}}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }} >
              {children}
      </Button>
    
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