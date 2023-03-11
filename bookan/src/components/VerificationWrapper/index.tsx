import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useApplicationStore } from "../../stores/store"

export const VerificationWrapper = (props: any) => {
    const getLoggedUser = useApplicationStore(state => state.getLoggedUser)
    const user = useApplicationStore(state => state.loggedUser)

    useEffect(() => {
        getLoggedUser()
        console.log(user)
    }, [])

    if (user.data[0] !== undefined && user.data[0].emailConfirmed)
        return props.children
    return (
        <Flex w={'100%'} h={'100vh'} justify={'center'} alignItems={'center'} >
            <Flex direction={'column'} alignItems={'center'} w={'500px'} border={'1px solid orange'} borderRadius={'15px'} p={'25px'}>
                <Text fontSize={'lg'} fontWeight={'600'} width={'500px'} textAlign={'center'} p={'10px'}>
                    Verification code has been sent to your email. Please, verify to continue
                </Text>
                <img src="verification.jpg" alt="verification image" />
            </Flex>

        </Flex >
    )
}