import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const ModalContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    gap: "20px",
    fontWeight: "bold",
    border: "1px solid white",
    width: "90%",
    height: 400,
    padding: "20px",
    background: theme.palette.background.default,
}));

export default ModalContainer;
