import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertContext from "../context/AlertContext";

const Alert = () => {
    const { alert } = useContext(AlertContext);

    if (!alert) {
        return null;
    }

    return (
        <Snackbar
            open
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <MuiAlert variant="filled" severity={alert.severity}>{alert.message}</MuiAlert>
        </Snackbar>
    );
};

export default Alert;
