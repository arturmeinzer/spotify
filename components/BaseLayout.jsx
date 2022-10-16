import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { CgProfile } from "react-icons/cg";
import { ImMusic, ImSpotify } from "react-icons/im";
import { GiBackwardTime, GiGuitarHead } from "react-icons/gi";
import { TbPlaylist } from "react-icons/tb";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import NavLink from "./NavLink";

const NavBarLeft = styled(Stack)({
    position: "fixed",
    justifyContent: "space-between",
    height: "100%",
    width: 100,
    left: 0,
    top: 0,
    padding: "30px 0",
    background: "black",
});

const NavBarBottom = styled(Box)({
    display: "grid",
    gridTemplateColumns: "repeat(5, 20%)",
    position: "fixed",
    height: 70,
    width: "100%",
    left: 0,
    bottom: 0,
    background: "black",
});

const navLinks = [
    {
        href: "/profile",
        caption: "Profile",
        icon: <CgProfile />,
    },
    {
        href: "/artists",
        caption: "Top Artists",
        icon: <GiGuitarHead />,
    },
    {
        href: "/tracks",
        caption: "Top Tracks",
        icon: <ImMusic />,
    },
    {
        href: "/recent",
        caption: "Recent",
        icon: <GiBackwardTime />,
    },
    {
        href: "/playlists",
        caption: "Playlists",
        icon: <TbPlaylist />,
    },
];

const BaseLayout = ({ children }) => {
    const router = useRouter();
    const currentRoute = router.route;

    return (
        <>
            <Box sx={{
                flexGrow: 1,
                minHeight: "100%",
                padding: { xs: "10px", md: "40px" },
                paddingLeft: { xs: "10px", md: "140px" },
            }}
            >
                {children}
            </Box>
            <NavBarLeft sx={{ display: { xs: "none", md: "flex" } }}>
                <Box sx={{ textAlign: "center", fontSize: "50px" }}>
                    <ImSpotify color="green" />
                </Box>
                <Box>
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.href}
                            caption={item.caption}
                            href={item.href}
                            icon={item.icon}
                            active={currentRoute === item.href}
                        />
                    ))}
                </Box>
                <Box />
            </NavBarLeft>
            <NavBarBottom sx={{ display: { xs: "grid", md: "none" } }}>
                {navLinks.map((item) => (
                    <NavLink
                        key={item.href}
                        caption={item.caption}
                        href={item.href}
                        icon={item.icon}
                        active={currentRoute === item.href}
                    />
                ))}
            </NavBarBottom>
        </>
    );
};

BaseLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BaseLayout;
