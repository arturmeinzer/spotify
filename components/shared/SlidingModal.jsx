import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { IoMdClose } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import ModalContainer from "../UI/ModalContainer";

const SlidingModal = ({
    title,
    open,
    onClose,
    children,
}) => (
    <Modal
        open={open}
        onClose={onClose}
    >
        <Slide in={open} direction="up">
            <ModalContainer>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", margin: "20px 0", textAlign: "center" }}
                >
                    {title}
                </Typography>
                <IconButton
                    sx={{ position: "absolute", right: "20px", top: "15px" }}
                    onClick={onClose}
                >
                    <IoMdClose color="orange" />
                </IconButton>
                <Box sx={{ height: "calc(100% - 70px)", overflowY: "scroll", padding: "10px 0" }}>
                    {children}
                </Box>
            </ModalContainer>
        </Slide>
    </Modal>
);

SlidingModal.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default SlidingModal;
