import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const NavBarBottom = styled(Box)({
    display: "grid",
    gridTemplateColumns: "repeat(5, 20%)",
    position: "fixed",
    height: 80,
    width: "100%",
    left: 0,
    bottom: 0,
    background: "black",
    "& a > div": {
        padding: "10px",
        borderTop: "7px solid transparent",
        color: "#aaa",
    },
    "& a:hover > div, & a > div.active": {
        borderTop: "7px solid green",
        backgroundColor: grey[900],
        color: "white",
    },
});

export default NavBarBottom;
