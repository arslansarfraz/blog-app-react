import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {motion, LayoutGroup} from "framer-motion";
import React from "react";
import {usePosts} from "../../hooks/posts";
import SinglePost from "../posts/SinglePost";
import {useUser} from "../../hooks/user";
export default function PostList() {
  const {posts, isLoading} = usePosts();
  // const {user, isLoading: userLoading} = useUser();
  if (isLoading)
    return (
      <Box pos='absolute' top='50%' left='50%'>
        <Spinner size='xl' />
      </Box>
    );

  return (
    <Container maxW={"7xl"} p='12'>
      <Heading as='h2' marginTop='5'>
        Latest articles
      </Heading>
      <Divider marginTop='5' />
      <Grid
        templateColumns='repeat(auto-fill, minmax(300px, 2fr))'
        gap={6}
        marginTop='5'
      >
        {posts.map(post => (
          <GridItem key={post.id}>
            <motion.div layout>
              <SinglePost post={post} />
            </motion.div>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
