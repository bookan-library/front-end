import {
  Box,
  Button,
  Divider,
  Flex,
  interactivity,
  Text,
  useTab,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import React from "react";
import { Comment } from "../../Model/Comment";
import { useApplicationStore } from "../../stores/store";
import { CommentStatus } from "../../types/CommentStatus";
import { CommentStore } from "../../stores/commentStore";

interface Props {
  comment: Comment;
  approveComment: (commentId: number, flag: number) => void;
}

export const PendingComment = ({ comment, approveComment }: Props) => {
  // const approveComment = useApplicationStore(state => state.approveComment)
  const approveCommentRes = useApplicationStore(
    (state) => state.approveCommentRes
  );
  const toast = useToast();

  const handleApprovement = async (commentId: number, flag: number) => {
    console.log("cid ", commentId);
    await approveComment(commentId, flag);
  };

  return (
    <Flex
      direction={"column"}
      padding={"50px"}
      width={"100%"}
      justifyContent="space-between"
    >
      <Flex
        alignItems={"center"}
        gap={"30px"}
        justifyContent="space-between"
        width={"100%%"}
      >
        <Flex
          direction={"column"}
          gap={"10px"}
          justifyContent="space-between"
          width={"90%"}
        >
          <Flex justifyContent={"space-between"} width={"100%"}>
            <Box>
              <Text fontWeight={"600"}>{comment.nickname}</Text>
              <Text fontWeight={"400"} color="gray">
                {comment.buyer.email}
              </Text>
            </Box>
            <Box pr={"20px"} color="gray">
              <Text>Knjiga: {comment.book.name}</Text>
              <Text>
                Autor: {comment.book.author.firstName}{" "}
                {comment.book.author.lastName}
              </Text>
              <Text>Kategorija: {comment.book.category.name}</Text>
            </Box>
          </Flex>
          <Text color={"gray"}>{comment.content}</Text>
        </Flex>
        <Flex gap={"15px"}>
          <Button
            onClick={() =>
              handleApprovement(comment.id, CommentStatus.APPROVED)
            }
          >
            <AiOutlineCheck color="green"></AiOutlineCheck>
          </Button>
          <Button
            onClick={() =>
              handleApprovement(comment.id, CommentStatus.UNAPPROVED)
            }
          >
            <BsTrash color="red"></BsTrash>
          </Button>
        </Flex>
      </Flex>
      <Divider mt={"10px"}></Divider>
    </Flex>
  );
};
