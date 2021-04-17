import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid
} from "@material-ui/core";
import axios from "axios";
import { makeValidate } from "mui-rff";
import React, { useContext } from "react";
import { Form as FForm } from "react-final-form";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthProvider";
import {
    SectionHeaderItem,
    TextEntryItem
} from "../FormComponents";

export default function AssignmentGradingForm({
    courseId,
    assignmentSubmission,
    assignment,
    score,
    children
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { authHeader } = useContext(AuthContext);

    const onSubmit = values => {
        axios
            .request({
                url:`api/submissions`,
                method: "PUT",
                ...authHeader,
                data: values
            })
            .then(res => {
                alert("Assignment Graded Successfully!");
                window.location.reload();
            })
            .catch((err, res) => {
                alert(`${err.message}:\n${err.response.data.error}`);
            });
    };

    const validationSchema = Yup.object().shape({
        receivedScore: Yup.string().required("Score is required")
    });

    const validate = makeValidate(validationSchema);

    return (
        <div>
            <div key="assignment-form-open-button" onClick={handleClickOpen}>
                {children}
            </div>
            <FForm
                onSubmit={onSubmit}
                initialValues={
                    assignment
                }
                validate={validate}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">
                                Score Assignment
                            </DialogTitle>
                            <DialogContent>
                                <Grid
                                    container
                                    spacing={2}
                                    justify="space-between"
                                >
                                    <SectionHeaderItem
                                        top
                                        title="Score Assignment"
                                    />
                                    <TextEntryItem
                                        name="receivedScore"
                                        label="Score"
                                        required={true}
                                        sm={3}
                                    />
                                    <TextEntryItem
                                        name="instructorFeedback"
                                        label="Comments"
                                        rows={6}
                                        multiline
                                    />
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                )}
            </FForm>
        </div>
    );
}
