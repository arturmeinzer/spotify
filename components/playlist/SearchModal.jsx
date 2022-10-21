import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import SlidingModal from "../shared/SlidingModal";

const SearchModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton size="small" onClick={() => setOpen(true)}>
                <AiOutlinePlus />
            </IconButton>
            <SlidingModal title="Search Tracks" open={open} onClose={() => setOpen(false)}>
                Test
            </SlidingModal>
        </>
    );
};

export default SearchModal;
