import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Tooltip
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import { makeValidate } from "mui-rff";
import React, { useContext } from "react";
import { Form as FForm } from "react-final-form";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthProvider";
import { AssignmentType, ASSIGNMENT_TYPES, getFormattedDueDate } from "../../helpers/constants";
import DetailsContainer from "../Courses/CourseDetails/DetailsContainer";
import DeleteConfirmationDialog from "../Courses/DeleteConfirmationDialog";
import {
    DateTimeEntryItem,
    SectionHeaderItem,
    TextEntryItem
} from "../FormComponents";

export default function AssignmentSubmissionForm({
    courseId,
    assignment,
    children
}) {

    const { user, authHeader } = useContext(AuthContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = values => {
        // axios
        //     .request({
        //         url: `api/courses/${courseId}/assignments`,
        //         method: assignment ? "PUT" : "POST",
        //         ...authHeader,
        //         data: values
        //     })
        //     .then(res => {
        //         alert("Assignment Updated Successfully!");
        //         window.location.reload();
        //     })
        //     .catch((err, res) => {
        //         alert(`${err.message}:\n${err.response.data.error}`);
        //     });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required")
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
                     assignmentId: assignment.Id, studentId: user.id
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
                                </Grid>
                            <DetailsContainer object={assignment}
                                   specialFormatters={{
                                        dueDate: d => getFormattedDueDate(d)
                                   }} 
                            />

                            {assignment.assignmentType === AssignmentType.TEXT_ENTRY ? 
                            <TextEntryItem name="submission" rows={6} multiline /> : <div><TextEntryItem /></div> }   

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
