import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

export default function AlertMessage({ message, onClose = () => {} }) {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "middle", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity="success">
                {message}
            </Alert>
        </Snackbar>
    );
}
