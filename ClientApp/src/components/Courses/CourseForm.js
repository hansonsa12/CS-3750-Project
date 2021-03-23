import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Tooltip,
    Typography
} from "@material-ui/core";
import { Add } from '@material-ui/icons';
import axios from 'axios';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";
import { Checkboxes, makeValidate } from "mui-rff";
import React, { useContext } from "react";
import { Form as FForm } from "react-final-form";
import * as Yup from "yup";
import { AuthContext } from '../../context/AuthProvider';
import { DEPARTMENTS } from '../../helpers/constants';
import {
    SectionHeaderItem,
    TextEntryItem,
    TimeEntryItem
} from '../FormComponents';

export default function CourseForm({
    course,
    action = course ? "Edit" : "Add"
}) {
    const [open, setOpen] = React.useState(false);

    const { user, authHeader } = useContext(AuthContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const openButton = (
        <Tooltip title={`${action} Course`} placement="right">
            { course ? <Button onClick={handleClickOpen}
                variant="contained" color="primary"> Edit</Button>
                : (<IconButton onClick={handleClickOpen}>
                    <Add />
                </IconButton>)
            }
        </Tooltip>
    );

    const onSubmit = (values) => {
        let formattedValues = {
            ...values,
            meetingDays: values.meetingDays?.join(''),
            startTime: values.startTime ? dayjs(values.startTime).format("hh:mm A") : undefined,
            endTime: values.endTime ? dayjs(values.endTime).format("hh:mm A") : undefined,
            instructorId: user.userId
        }
        formattedValues = _.omitBy(formattedValues, _.isUndefined); // get rid of undefined values

        axios.request({
            url: 'api/courses',
            method: course ? 'PUT' : 'POST',
            ...authHeader,
            data: formattedValues
        }).then(res => {
            alert("Course Updated Successfully!");
            window.location.reload();
            // TODO Ky create and call updateCourses so app re-renders without reload
        }).catch((err, res) => {
            alert(`${err.message}:\n${err.response.data.error}`);
        });

    };


    const validationSchema = Yup.object().shape({
        courseName: Yup.string().required("Course name is required"),
        courseNumber: Yup.string().required("Course number is required"),
        department: Yup.string().required("Department is required"),
    });

    const validate = makeValidate(validationSchema);

    dayjs.extend(customParseFormat);
    let initialValues = {
        ...course,
        meetingDays: course?.meetingDays?.split(''),
        startTime: dayjs(course?.startTime, "hh:mm A").format(),
        endTime: dayjs(course?.endTime, "hh:mm A").format()
    };

    if (!initialValues.creditHours) {
        initialValues.creditHours = 0;
    }

    return (
        <div>
            {openButton}
            <FForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={validate}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">{action} Course</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} justify="space-between">
                                    <SectionHeaderItem top title="Course Information" />
                                    <TextEntryItem name="courseName" sm={8} required={true} />
                                    <TextEntryItem name="courseNumber" sm={4} required={true} />
                                    <TextEntryItem name="description" rows={6} multiline />
                                    <TextEntryItem name="department" select sm={9} required={true}>
                                        {DEPARTMENTS.map((option, index) =>(
                                            <MenuItem key={`departmentOption-${index}`} value={index}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextEntryItem>
                                    <TextEntryItem name="creditHours" select sm={3}>
                                        {["n/a", "1", "2", "3", "4", "5"].map((option, index) => (
                                            <MenuItem key={`creditHoursOption-${index}`} value={index}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextEntryItem>
                                    <SectionHeaderItem title="Meeting Location/Time" />
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
