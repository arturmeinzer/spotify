import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const NavBarBottom = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(5, 20%)",
    position: "fixed",
    height: 85,
    width: "100%",
    left: 0,
    bottom: 0,
    background: "black",
    textAlign: "center",
    "& a > div": {
        height: "100%",
        padding: "10px",
        borderTop: "7px solid transparent",
        color: theme.palette.text.secondary,
    },
    "& a:hover > div, & a > div.active": {
        borderTop: "7px solid green",
        backgroundColor: grey[900],
        color: theme.palette.text.primary,
    },
}));

export default NavBarBottom;
