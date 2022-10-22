import create from "zustand";

const DEFAULT_TIMEOUT = 5000;

const useAlertStore = create((set) => ({
    alert: null,
    success: (message, timeout = DEFAULT_TIMEOUT) => {
        set({ alert: { message, severity: "success" } });
        setTimeout(() => {
            set({ alert: null });
        }, timeout);
    },
    error: (message, timeout = DEFAULT_TIMEOUT) => {
        set({ alert: { message, severity: "error" } });
        setTimeout(() => {
            set({ alert: null });
        }, timeout);
    },
    info: (message, timeout = DEFAULT_TIMEOUT) => {
        set({ alert: { message, severity: "info" } });
        setTimeout(() => {
            set({ alert: null });
        }, timeout);
    },
}));

export default useAlertStore;
