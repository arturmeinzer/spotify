import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const CenterContainer = styled(Stack)({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    fontSize: "25px",
    fontWeight: "bold",
});

export default CenterContainer;
