import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const PropertyContent = styled(Box)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: "bold",
}));

export default PropertyContent;
