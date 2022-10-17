import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { ImMusic, ImSpotify } from "react-icons/im";
import { GiBackwardTime, GiGuitarHead } from "react-icons/gi";
import { TbPlaylist } from "react-icons/tb";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import NavLink from "./NavLink";
import NavBarLeft from "./UI/NavBarLeft";
import NavBarBottom from "./UI/NavBarBottom";
import Loader from "./Loader";

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

const BaseLayout = ({ children, loading }) => {
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

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Box sx={{
                minHeight: "100%",
                height: "100%",
                padding: { xs: "10px", md: "40px" },
                paddingLeft: { xs: "10px", md: "140px" },
            }}
            >
                {children}
            </Box>
            <Box sx={{ height: 80 }} />

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

BaseLayout.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

BaseLayout.defaultProps = {
    loading: false,
};

export default BaseLayout;
