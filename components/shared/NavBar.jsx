import React from "react";
import Box from "@mui/material/Box";
import { ImMusic, ImSpotify } from "react-icons/im";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import { GiBackwardTime, GiGuitarHead } from "react-icons/gi";
import { TbPlaylist } from "react-icons/tb";
import NavBarLeft from "../UI/NavBarLeft";
import NavBarBottom from "../UI/NavBarBottom";
import NavLink from "./NavLink";

const navLinks = [
    {
        href: "/profile",
        caption: "Profile",
        icon: <FaUserCircle />,
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

const NavBar = () => {
    const router = useRouter();
    const currentRoute = router.route;

    const renderNavLinks = () => navLinks.map((item) => (
        <NavLink
            key={item.href}
            caption={item.caption}
            href={item.href}
            icon={item.icon}
            active={currentRoute === item.href}
        />
    ));

    return (
        <>
            <NavBarLeft sx={{ display: { xs: "none", md: "flex" } }}>
                <Box sx={{ textAlign: "center", fontSize: "50px" }}>
                    <ImSpotify color="green" />
                </Box>
                <Box>
                    {renderNavLinks()}
                </Box>
                <Box />
            </NavBarLeft>
            <NavBarBottom sx={{ display: { xs: "grid", md: "none" } }}>
                {renderNavLinks()}
            </NavBarBottom>
        </>
    );
};

export default NavBar;
