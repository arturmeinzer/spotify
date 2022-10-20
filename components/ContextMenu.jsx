import React, { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Menu from "@mui/material/Menu";
import MenuContext from "../context/MenuContext";

const ContextMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = useContext(MenuContext);

    return (
        <>
            <AiOutlineMenu
                onClick={handleClick}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {menuItems}
            </Menu>
        </>
    );
};

export default ContextMenu;
