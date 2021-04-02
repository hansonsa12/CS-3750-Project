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
import { AssignmentType, ASSIGNMENT_TYPES } from "../../helpers/constants";
import DeleteConfirmationDialog from "../Courses/DeleteConfirmationDialog";
import {
    DateTimeEntryItem,
    SectionHeaderItem,
    TextEntryItem
} from "../FormComponents";

export default function AssignmentForm({
    courseId,
    assignment,
    action = assignment ? "Edit" : "Add",
    children
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { authHeader, isInstructor } = useContext(AuthContext);

    const onSubmit = values => {
        axios
            .request({
                url: `api/courses/${courseId}/assignments`,
                method: assignment ? "PUT" : "POST",
                ...authHeader,
                data: values
            })
            .then(res => {
                alert("Assignment Updated Successfully!");
                window.location.reload();
            })
            .catch((err, res) => {
                alert(`${err.message}:\n${err.response.data.error}`);
            });
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
                initialValues={
                    assignment || {
                        assignmentType: AssignmentType.FILE_UPLOAD,
                        courseId
                    }
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
                                {action} Assignment
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
                                        action={
                                            isInstructor &&
                                            assignment && (
                                                <DeleteConfirmationDialog
                                                    resourceId={
                                                        assignment.assignmentId
                                                    }
                                                    resourceName={
                                                        assignment.title
                                                    }
                                                    route={`courses/${assignment.courseId}/assignments`}
                                                    onDelete={() =>
                                                        window.location.reload()
                                                    }
                                                >
                                                    <Tooltip
                                                        title="Delete Assignment"
                                                        placement="left"
                                                    >
                                                        <IconButton size="small">
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </DeleteConfirmationDialog>
                                            )
                                        }
                                    />
                                    <TextEntryItem
                                        name="title"
                                        required={true}
                                        sm={8}
                                    />
                                    <TextEntryItem
                                        name="assignmentType"
                                        sm={4}
                                        required={true}
                                        select
                                    >
                                        {ASSIGNMENT_TYPES.map(
                                            (option, index) => (
                                                <MenuItem
                                                    key={`assignmentTypeOption-${index}`}
                                                    value={option}
                                                >
                                                    {option}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextEntryItem>
                                    <TextEntryItem
                                        name="description"
                                        rows={6}
                                        multiline
                                    />
                                    <TextEntryItem
                                        name="maxPoints"
                                        sm={6}
                                        type="number"
                                    />
                                    <DateTimeEntryItem name="dueDate" sm={6} />
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
