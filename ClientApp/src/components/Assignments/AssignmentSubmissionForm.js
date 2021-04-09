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
import { AssignmentType, getFormattedDateTime } from "../../helpers/helpers";
import DetailsContainer from "../DetailsContainer";
import { SectionHeaderItem, TextEntryItem } from "../FormComponents";

export default function AssignmentSubmissionForm({ assignment, children }) {
    const { user, authHeader } = useContext(AuthContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = values => {
        axios
            .request({
                url: `api/assignments/${values.assignmentId}/submissions`,
                method: "POST",
                ...authHeader,
                data: values
            })
            .then(res => {
                alert("Assignment successfully submitted!");
                window.location.reload();
            })
            .catch((err, res) => {
                alert(`${err.message}:\n${err.response.data.error}`);
            });
    };

    const validationSchema = Yup.object().shape({
        submission: Yup.string().required("Submission is required")
    });

    const validate = makeValidate(validationSchema);
    return (
        <div>
            <div key="course-form-open-button" onClick={handleClickOpen}>
                {children}
            </div>
            <FForm
                onSubmit={onSubmit}
                initialValues={{
                    assignmentId: assignment.assignmentId,
                    studentId: user.userId
                }}
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
                                Submit Assignment
                            </DialogTitle>
                            <DialogContent>
                                <Grid
                                    container
                                    spacing={2}
                                    justify="space-between"
                                >
                                    <SectionHeaderItem
                                        top
                                        title="Assignment Information"
                                    />
                                    <Grid item xs={12}>
                                        <DetailsContainer
                                            object={assignment}
                                            specialFormatters={{
                                                dueDate: d =>
                                                    getFormattedDateTime(d)
                                            }}
                                            omitProperties={[
                                                "assignmentId",
                                                "courseId"
                                            ]}
                                        />
                                    </Grid>
                                    <SectionHeaderItem title="Submission" />
                                    {assignment.assignmentType ===
                                    AssignmentType.TEXT_ENTRY ? (
                                        <TextEntryItem
                                            name="submission"
                                            label="Submission Text"
                                            rows={6}
                                            multiline
                                        />
                                    ) : (
                                        <TextEntryItem name="submission" />
                                    )}
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
