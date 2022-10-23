import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { RotatingLines } from "react-loader-spinner";
import { AiOutlineReload } from "react-icons/ai";

const LoadingButton = ({
    loading,
    children,
    onClick,
    startIcon,
    color,
}) => (
    <Button
        disabled={loading}
        color={color}
        onClick={onClick}
        startIcon={(
            loading ? <RotatingLines strokeColor="grey" width="20" /> : startIcon
        )}
    >
        {children}
    </Button>
);

LoadingButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    color: PropTypes.string,
    startIcon: PropTypes.node,
};

LoadingButton.defaultProps = {
    onClick: null,
    color: "success",
    startIcon: <AiOutlineReload />,
};

export default LoadingButton;
