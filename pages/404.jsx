import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import CenterContainer from "../components/UI/CenterContainer";

const Four0Four = () => {
    const router = useRouter();

    return (
        <CenterContainer>
            <Box>404 Page Not Found</Box>
            <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "50px", padding: "10px 30px" }}
                onClick={() => router.push("/")}
            >
                Go Back Home
            </Button>
        </CenterContainer>
    );
};

export default Four0Four;
