import { styled } from "@mui/material/styles";

const Anchor = styled("a")({
    cursor: "pointer",
    "&:hover img": {
        opacity: "0.5",
    },
});

export default Anchor;
