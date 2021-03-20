import React, { useContext } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography
} from "@material-ui/core";
import { Form as FForm } from "react-final-form";
import { TextField, showErrorOnBlur} from "mui-rff";

import { Grid } from "@material-ui/core";
import _ from "lodash";
import { AuthContext } from '../../context/AuthProvider';


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

    const TextEntry = (fieldProps) => (
        <Grid item xs={12} {..._.pick(fieldProps, ["sm"])}>
            <TextField
                size="small"
                label={_.startCase(fieldProps.name)}
                variant="outlined"
                showError={showErrorOnBlur}
                {..._.omit(fieldProps, ["sm"])}
            />
        </Grid>
    );

    const SectionHeader = (fieldProps) => (
        <Grid item xs={12}>
            <Typography style={fieldProps.style}>{fieldProps.title}</Typography>
            <Divider />
        </Grid>
    );




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
                        <Grid container>
                        <SectionHeader title="Profile Information" />
                        <TextEntry name="title"></TextEntry>
                        <TextEntry name="description"></TextEntry>
                        <TextEntry name="points"></TextEntry>
                        <TextEntry name="dueDate"></TextEntry>
                        <TextEntry name="type"></TextEntry>
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