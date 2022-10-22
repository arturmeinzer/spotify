import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useAlertStore from "../../store/useAlertStore";

const Alert = () => {
    const alert = useAlertStore((state) => state.alert);

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
