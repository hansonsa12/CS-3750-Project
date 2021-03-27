import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeValidate } from "mui-rff";
import React, { useContext } from "react";
import { Form as FForm } from "react-final-form";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthProvider";
import { AssignmentType, ASSIGNMENT_TYPES } from "../../helpers/constants";
import {
    DateTimeEntryItem,
    SectionHeaderItem,
    TextEntryItem,
} from "../FormComponents";

export default function AssignmentForm({ courseId }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = values => {
        alert(JSON.stringify(values));
    };

    const { authHeader } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        dueDate: Yup.string().required("Due Date is required"),
        maxPoints: Yup.number().required("Max points is required"),
    });

    const validate = makeValidate(validationSchema);

    return (
        <div>
            <IconButton size="small" onClick={handleClickOpen}>
                <Add fontSize="small" />
            </IconButton>
            <FForm
                onSubmit={onSubmit}
                initialValues={{
                    assignmentType: AssignmentType.FILE_UPLOAD,
                    maxPoints: 0,
                    courseId,
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
                                Assignment Form
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
                                        required={true}
                                        type="number"
                                    />
                                    <DateTimeEntryItem
                                        name="dueDate"
                                        sm={6}
                                        required={true}
                                    />
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
