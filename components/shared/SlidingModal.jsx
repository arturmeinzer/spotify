import React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { IoMdCloseCircleOutline } from "react-icons/io";
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
                    sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
                >
                    {title}
                </Typography>
                <IconButton sx={{ position: "absolute", right: "20px", top: "15px" }} onClick={onClose}>
                    <IoMdCloseCircleOutline color="orange" />
                </IconButton>
                <Box>{children}</Box>
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
