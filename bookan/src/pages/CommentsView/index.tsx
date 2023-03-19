import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { PendingComment } from '../../components/PendingComment/PendingComment'
import { Comment } from '../../Model/Comment'
import { useApplicationStore } from '../../stores/store'

export const CommentsView = () => {

    const getPendingComments = useApplicationStore(state => state.getPendingComments)
    const pendingComments = useApplicationStore(state => state.pendingComments)
    const approveComment = useApplicationStore(state => state.approveComment)
    const approveCommentRes = useApplicationStore(state => state.approveCommentRes)

    useEffect(() => {
        getPendingComments()
        console.log('com', pendingComments)
    }, [])

    useEffect(() => {
        getPendingComments()
    }, [pendingComments])

    const handleApprove = (id: number, flag: number) => {
        approveComment(id, flag)
        getPendingComments()
    }

    return (
        <Flex>
            {
                pendingComments && pendingComments.data.map((pendingComment: Comment) =>
                    <PendingComment comment={pendingComment} approveComment={(id: number, flag: number) => handleApprove(id, flag)}></PendingComment>
                )
            }
        </Flex>
    )
}
