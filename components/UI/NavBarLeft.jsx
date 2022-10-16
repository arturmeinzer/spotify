import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const NavBarLeft = styled(Box)({
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    justifyContent: "space-between",
    height: "100%",
    width: 100,
    left: 0,
    top: 0,
    padding: "30px 0",
    background: "black",
    "& a > div": {
        padding: "15px",
        borderRight: "7px solid transparent",
        color: "#aaa",
    },
    "& a:hover > div, & a > div.active": {
        borderRight: "7px solid green",
        backgroundColor: grey[900],
        color: "white",
    },
});

export default NavBarLeft;
