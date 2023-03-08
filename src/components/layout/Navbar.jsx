import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Tooltip,
} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/react";
import {RiLogoutCircleLine} from "react-icons/ri";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {LOGIN, REGISTER, ROOT} from "../../lib/routes";
import {Link as routerLink} from "react-router-dom";
import Newpost from "../posts/NewPost";
import {ModalBody} from "react-bootstrap";
import {useLogout} from "../../hooks/auths";
import {useAuth} from "../../hooks/auths";

export default function Navbar() {
  const {colorMode, toggleColorMode} = useColorMode();
  const {logout, isLoading} = useLogout();
  const {user, authLoading} = useAuth();
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const Links = [
    {id: 1, path: ROOT, name: "Home"},
    {id: 2, path: LOGIN, name: "Sign in"},
    {id: 3, path: REGISTER, name: "Create an account"},
  ];
  return (
    <Container maxW='1300px'>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{md: "none"}}
            onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as='b' fontSize='2xl'>
              <Link
                as={routerLink}
                to={ROOT}
                _hover={{
                  textDecoration: "none",
                }}
              >
                Logo
              </Link>
            </Box>

            <HStack as={"nav"} spacing={4} display={{base: "none", md: "flex"}}>
              {!user ? (
                Links.map(link => (
                  <Link
                    px={2}
                    py={1}
                    as={routerLink}
                    to={link.path}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    key={link.id}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                <Link
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button mr={4} onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {user ? (
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                onClick={onModalOpen}
                leftIcon={<AddIcon />}
              >
                Create Post
              </Button>
            ) : (
              <Tooltip label='Activate me, captain! Login required'>
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  isDisabled={true}
                  size={"sm"}
                  mr={4}
                  onClick={onModalOpen}
                  leftIcon={<AddIcon />}
                >
                  Action
                </Button>
              </Tooltip>
            )}
            {/* Modal */}
            <Modal
              closeOnOverlayClick={false}
              isOpen={isModalOpen}
              onClose={onModalClose}
              size={"xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={12}>
                  <Newpost onModalClose={onModalClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
            {/* Modal end */}
            {user && (
              <Button
                ml='auto'
                colorScheme='teal'
                size='sm'
                onClick={logout}
                isLoading={isLoading}
              >
                <Icon as={RiLogoutCircleLine} />
              </Button>
            )}
          </Flex>
        </Flex>

        {isMenuOpen ? (
          <Box pb={4} display={{md: "none"}}>
            <Stack as={"nav"} spacing={4}>
              {!user ? (
                Links.map(link => (
                  <Link
                    px={2}
                    py={1}
                    as={routerLink}
                    to={link.path}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    key={link.id}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                <Link
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
