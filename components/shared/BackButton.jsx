import React from "react";
import IconButton from "@mui/material/IconButton";
import { BiArrowBack } from "react-icons/bi";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

const BackButton = () => {
    const router = useRouter();

    return (
        <Box>
            <IconButton onClick={() => router.back()}>
                <BiArrowBack />
            </IconButton>
        </Box>
    );
};

export default BackButton;
