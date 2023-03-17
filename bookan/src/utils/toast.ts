import { ResponseStatus } from "../stores/types"

export const displayToast = (success: string, toast: any, status: ResponseStatus) => {
    if (status === ResponseStatus.Success)
        return toast({
            title: success,
            // description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    return toast({
        title: "Something went wrong, try again!",
        // description: "We've created your account for you.",
        status: 'error',
        duration: 9000,
        isClosable: true,
    })
}