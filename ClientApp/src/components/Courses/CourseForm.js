import React, { useContext } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    Typography
} from "@material-ui/core";
import { Form as FForm } from "react-final-form";
import { Checkboxes, makeValidate } from "mui-rff";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import dayjs from "dayjs";
import * as Yup from "yup";
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { TextEntryItem, TimeEntryItem } from '../StyledComponents';

export default function CourseForm(props) {
    const [open, setOpen] = React.useState(false);

    const { user, authHeader } = useContext(AuthContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        let formattedValues = {
            ...values,
            meetingDays: values.meetingDays?.join(''),
            startTime: values.startTime ? dayjs(values.startTime).format("hh:mm A") : undefined,
            endTime: values.endTime ? dayjs(values.endTime).format("hh:mm A") : undefined,
            instructorId: user.userId
        }
        formattedValues = _.omitBy(formattedValues, _.isUndefined); // get rid of undefined values
        console.log(formattedValues);

        axios
            .post("api/courses", formattedValues, authHeader)
            .then(res => {
                alert("Course Added Successfully!");
                handleClose();
            })
            .catch(err => {
                alert(err.message);
                console.error(err.message);
            });
    };

    const SectionHeader = (fieldProps) => (
        <Grid item xs={12}>
            <Typography style={fieldProps.style}>{fieldProps.title}</Typography>
            <Divider />
        </Grid>
    );

    const validationSchema = Yup.object().shape({
        courseName: Yup.string().required("Course name is required"),
        courseNumber: Yup.string().required("Course number is required"),
        department: Yup.string().required("Department is required"),
    });

    const validate = makeValidate(validationSchema);

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Add A Course
            </Button>
            <FForm
                onSubmit={onSubmit}
                initialValues={{
                    creditHours: 0
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
                            <DialogTitle id="form-dialog-title">Add Course</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} justify="space-between">
                                    <SectionHeader title="Course Information" />
                                    <TextEntryItem name="courseName" sm={6} required={true} />
                                    <TextEntryItem name="courseNumber" sm={6} required={true} />
                                    <TextEntryItem name="description" rows={6} multiline />
                                    <TextEntryItem name="department" sm={9} required={true} />
                                    <TextEntryItem name="creditHours" select sm={3}>
                                        {["n/a", "1", "2", "3", "4", "5"].map((option, index) => (
                                            <MenuItem key={`creditHoursOption-${index}`} value={index}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextEntryItem>
                                    <SectionHeader style={{ marginTop: 10 }} title="Meeting Location/Time" />
                                    <TextEntryItem name="buildingName" sm={8} />
                                    <TextEntryItem name="roomNumber" sm={4} />
                                    <Grid item container xs={12} alignItems="center" justify="center">
                                        <Typography>Meeting Days:</Typography>
                                        <Checkboxes
                                            name="meetingDays"
                                            data={["M", "T", "W", "R", "F"].map(day => (
                                                { label: day, value: day }
                                            ))}
                                            formControlLabelProps={{ labelPlacement: "top" }}
                                            formGroupProps={{ row: true }}
                                        />
                                    </Grid>
                                    <TextEntryItem name="maxCapacity" sm={4} type="number" />
                                    <TimeEntryItem name="startTime" sm={4} />
                                    <TimeEntryItem name="endTime" sm={4} />
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
