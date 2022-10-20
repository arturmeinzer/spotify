import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const DEFAULT_TIMEOUT = 5000;
const AlertContext = createContext(null);

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const handleAlert = (severity, message, timeout = DEFAULT_TIMEOUT) => {
        setAlert({
            message,
            severity,
        });
        setTimeout(() => {
            setAlert(null);
        }, timeout);
    };

    const value = useMemo(() => ({
        alert,
        success: (message, timeout) => handleAlert("success", message, timeout),
        error: (message, timeout) => handleAlert("error", message, timeout),
    }), [alert]);

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    );
};

AlertProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AlertProvider };
export default AlertContext;
