import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const PropertyHeader = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "12px",
    marginBottom: "5px",
}));

export default PropertyHeader;
