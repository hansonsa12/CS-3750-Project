import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function DeleteConfirmationDialog({
    resourceId,
    resourceName,
    route,
    children,
    onDelete
}) {
    const [open, setOpen] = React.useState(false);
    const { authHeader } = useContext(AuthContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios
            .delete(`api/${route}/${resourceId}`, authHeader)
            .then(res => {
                alert("Course successfully deleted!");
                handleClose();
                onDelete && onDelete();
            })
            .catch(err => {
                alert(
                    `${err.message}:\n${
                        err.response.data.error || err.response.data
                    }`
                );
            });
    };

    return (
        <>
            <div onClick={handleClickOpen}>
                {children || (
                    <Button variant="contained" color="secondary">
                        Delete
                    </Button>
                )}
            </div>
            <Dialog onEnter={handleClickOpen} open={open} onClose={handleClose}>
                <DialogTitle>{"Delete course"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete{" "}
                        <strong>{resourceName}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
