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
import React, { useCallback, useContext, useState } from "react";
import { Form as FForm } from "react-final-form";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthProvider";
import { DataContext } from "../../context/DataProvider";
import { AssignmentType, getFormattedDateTime } from "../../helpers/helpers";
import DetailsContainer from "../DetailsContainer";
import FileUploader from "../FileUploading/FileUploader";
import { SectionHeaderItem, TextEntryItem } from "../FormComponents";

export default function AssignmentSubmissionForm({ assignment, children }) {
    const { user, authHeader } = useContext(AuthContext);
    const { submissions, setSubmissions } = useContext(DataContext);

    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setSelectedFile(acceptedFiles[0]);
    }, []);

    const onSubmit = async values => {
        try {
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile, selectedFile.name);

                const {
                    data: { fileName }
                } = await axios.post(
                    "api/fileuploads/submission",
                    formData,
                    authHeader
                );

                values.submission = selectedFile.name;
                values.fileName = fileName;
            }

            const res = await axios.post(
                `api/assignments/${values.assignmentId}/submissions`,
                values,
                authHeader
            );

            alert("Assignment successfully submitted!");
            setSubmissions([...submissions, res.data]);
            handleClose();
        } catch (err) {
            alert(`${err.message}:\n${err.response.data.error}`);
        }
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
                    studentId: user.userId,
                    submission: selectedFile
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
                                                dueDate: a =>
                                                    getFormattedDateTime(
                                                        a.dueDate
                                                    )
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
                                        <FileUploader
                                            onDrop={onDrop}
                                            selectedFile={selectedFile}
                                        />
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
