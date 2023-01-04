import React, { ReactNode } from 'react';
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure, BoxProps, FlexProps, } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiStar, FiSettings, FiMenu, FiMail, FiTwitter, FiSend } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useTranslation } from 'react-i18next'

type SidebarProps = {
    children?: JSX.Element | JSX.Element[];
}

export default function Sidebar({ children }: SidebarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg='white'>
            <SidebarContent
                bg={useColorModeValue('gray.100', 'gray.900')}
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarContentProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
    const { t, i18n } = useTranslation()
    
    interface LinkItemProps {
        name: string;
        link: string;
        icon: IconType;
    }
    const LinkItems: Array<LinkItemProps> = [
        { name: t("sidebar.home"), link: "home", icon: FiHome },
        { name: t("sidebar.email"), link: "email", icon: FiMail },
        { name: t("sidebar.sns"), link: "sns", icon: FiTwitter },
        { name: t("sidebar.chat"), link: "chat", icon: FiSend },
        // { name: t("sidebar.trend"), icon: FiTrendingUp },
        // { name: t("sidebar.favorite"), icon: FiStar },
        // { name: t("sidebar.settings"), icon: FiSettings },
    ];
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    {t("logo")}
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} link={link.link} icon={link.icon} >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    link: string;
    children: ReactText;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
    return (
        <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};