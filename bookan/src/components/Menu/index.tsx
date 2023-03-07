import React from 'react'
import styles from './index.module.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Flex,
} from '@chakra-ui/react'
import { link } from 'fs'

export const NavMenu = () => {
    return (
        <Flex className={styles.menu}>
            <Menu >
                <MenuButton className={styles.menuBtn}>
                    KATEGORIJE
                </MenuButton>
                <MenuList>
                    <MenuItem>KNJIGE</MenuItem>
                    <MenuItem>ZA DECU</MenuItem>
                    <MenuItem>ENGLISH BOOKS</MenuItem>
                    <MenuItem>GIFT</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton className={styles.menuBtn}>
                    AKCIJE
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton className={styles.menuBtn}>
                    NOVA IZDANJA
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton className={styles.menuBtn}>
                    GIFT KARTICE
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton className={styles.menuBtn}>
                    TIKTOK HITOVI
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton className={styles.menuBtn}>
                    USKORO
                </MenuButton>
            </Menu>
        </Flex>

    )
}
