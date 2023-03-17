import { Flex, Text } from '@chakra-ui/layout'
import { Divider } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Comment } from '../../Model/Comment'

interface Props {
    comment: any
}

export const CommentBox = ({ comment }: Props) => {

    return (
        <Flex direction={'column'} gap={'10px'} padding={'10px'}>
            <Text
                fontWeight={'600'}
            >
                {comment.nickname}
            </Text>
            <Text
                color={'gray'}
            >
                {comment.content}
            </Text>
            <Divider mt={'10px'}></Divider>
        </Flex>
    )
}
