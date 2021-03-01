import React from "react";
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
import { TextField, KeyboardTimePicker, Checkboxes, showErrorOnBlur } from "mui-rff";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import dayjs from "dayjs";

export default function CourseForm(props) {
    const [open, setOpen] = React.useState(false);

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
            startTime: values.startTime ? dayjs(values.startTime).format("HH:mm") : undefined,
            endTime: values.endTime ? dayjs(values.endTime).format("HH:mm") : undefined,
        }
        formattedValues = _.omitBy(formattedValues, _.isUndefined); // get rid of undefined values
        console.log(formattedValues);
        handleClose();
        alert("Course Added Successfully!");
    };

    const TextEntry = (fieldProps) => (
        <Grid item xs={12} {..._.pick(fieldProps, ['sm'])}>
            <TextField size="small" label={_.startCase(fieldProps.name)}
                variant="outlined" showError={showErrorOnBlur}
                {..._.omit(fieldProps, ['sm'])}
            />
        </Grid>
    )

    const TimeEntry = (fieldProps) => (
        <Grid item xs={12} {..._.pick(fieldProps, ['sm'])}>
            <KeyboardTimePicker label={_.startCase(fieldProps.name)}
                variant="inline"
                ampm={true}
                inputVariant="outlined"
                size="small"
                mask="__:__ _M"
                placeholder="08:00 AM"
                {..._.omit(fieldProps, ['sm'])}
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
            <Button color="primary" onClick={handleClickOpen}>
                Add A Course
            </Button>
            <FForm
                onSubmit={onSubmit}
                initialValues={{
                    creditHours: 0
                }}
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
                                    <TextEntry name="courseName" sm={6} />
                                    <TextEntry name="courseNumber" sm={6} />
                                    <TextEntry name="description" rows={6} multiline />
                                    <TextEntry name="department" sm={9} />
                                    <TextEntry name="creditHours" select sm={3}>
                                        {["n/a", "1", "2", "3", "4", "5"].map((option, index) => (
                                            <MenuItem key={`creditHoursOption-${index}`} value={index}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextEntry>
                                    <SectionHeader style={{ marginTop: 10 }} title="Meeting Location/Time" />
                                    <TextEntry name="buildingName" sm={8} />
                                    <TextEntry name="roomNumber" sm={4} />
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
                                    <TextEntry name="maxCapacity" sm={4} type="number" />
                                    <TimeEntry name="startTime" sm={4} />
                                    <TimeEntry name="endTime" sm={4} />
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
