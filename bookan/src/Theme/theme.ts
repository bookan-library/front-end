import { extendTheme, StyleFunctionProps } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        button: {
            hover: "red",
        },
    },
    components: {
        Popover: {
            baseStyle: {
                popper: {
                    sizes: {
                        md: {
                            w: '30px',
                            fontSize: 'lg',
                        },
                    },
                    minW: {
                        md: '26px!important'
                    },
                    maxW: {
                        md: '26px!important'
                    }
                },
            },
        },
    },
})

export default theme