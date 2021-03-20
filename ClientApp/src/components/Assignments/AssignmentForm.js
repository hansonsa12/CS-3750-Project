import React, { useContext } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { Form as FForm } from "react-final-form";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import { AuthContext } from '../../context/AuthProvider';
import { SectionHeaderItem, TextEntryItem, TimeEntryItem } from "../FormComponents";


export default function AssignmentForm(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {
        alert("success");
    }

    const {
        authHeader
    } = useContext(AuthContext);


    return (
        <div>
            <Button onClick={handleClickOpen}>Add Assignment</Button>
            <FForm onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">Assignment Form</DialogTitle>
                        <DialogContent>
                        <Grid container spacing={2} justify="space-between">
                        <SectionHeaderItem title="Assignment Information" />
                        <TextEntryItem name="title" required={true}></TextEntryItem>
                        <TextEntryItem name="description" rows={6} multiline></TextEntryItem>
                        <TextEntryItem name="points" sm={6} required={true}></TextEntryItem>
                        <TimeEntryItem name="dueDate" sm={6} required={true}></TimeEntryItem>
                        <TextEntryItem name="type" sm={6} required={true}></TextEntryItem>
                        </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                        </Dialog>
                    </form>
                    )}
            </FForm>
        </div>

    );
}