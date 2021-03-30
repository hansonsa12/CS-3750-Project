import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function DeleteConfirmationDialog({ courseId, courseName }) {
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
      .delete(`api/courses/${courseId}`, authHeader)
      .then(res => {
        alert("Course successfully deleted!");
        handleClose();
        window.location.reload();
      })
      .catch(err => {
        alert(
          `${err.message}:\n${err.response.data.error || err.response.data}`
        );
      });
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog onEnter={handleClickOpen} open={open} onClose={handleClose}>
        <DialogTitle>{"Delete course"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{courseName}</strong>?
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
