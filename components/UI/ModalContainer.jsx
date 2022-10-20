import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const ModalContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: "50%",
    gap: "20px",
    fontWeight: "bold",
    borderTop: `1px solid ${grey[800]}`,
    width: "100%",
    height: "50%",
    padding: "20px",
    background: theme.palette.background.default,
}));

export default ModalContainer;
