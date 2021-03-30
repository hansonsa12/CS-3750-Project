import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import React, { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { DataContext } from "../context/DataProvider";
import { getFormattedLocation, getFormattedTime } from "../helpers/constants";
import DepartmentDropDown from "./Courses/DepartmentDropDown";
import TableComponent from "./TableComponent";

export default function Registrations() {
    const { authHeader } = useContext(AuthContext);
    const { userCourses, allCourses, setUserCourses } = useContext(DataContext);

    const registeredCourseIds = useCallback(() => {
        // get array of registered course ids on initial component
        // load and if registrations array changes
        // https://reactjs.org/docs/hooks-reference.html#usecallback
        return _.map(userCourses, "courseId");
    }, [userCourses])();

    function registerForCourse(courseId) {
        axios
            .post(`api/registrations/${courseId}`, {}, authHeader)
            .then(res => {
                alert("Registered Successfully!");
                setUserCourses(res.data);
            })
            .catch((err, res) => {
                alert(`${err.message}:\n${err.response.data.error}`);
            });
    }

    function dropCourse(courseId) {
        axios
            .delete(`api/registrations/${courseId}`, authHeader)
            .then(res => {
                alert("Dropped Sucessfully");
                setUserCourses(res.data);
            })
            .catch((err, res) => {
                alert(`${err.message}:\n${err.response.data.error}`);
            });
    }

    const columns = useCallback(
        () => [
            { header: "Course Number", accessor: "courseNumber" },
            { header: "Title", accessor: "courseName" },
            {
                header: "Instructor",
                accessor: r =>
                    `${r.instructor?.lastName}, ${r.instructor?.firstName}`,
            },
            {
                header: "Location",
                accessor: r =>
                    getFormattedLocation(r.buildingName, r.roomNumber),
            },
            {
                header: "Time",
                accessor: r => getFormattedTime(r.startTime, r.endTime),
            },
            { header: "Meeting Days", accessor: "meetingDays" },
            {
                header: "Register",
                accessor: r =>
                    registeredCourseIds.includes(r.courseId) ? (
                        <Button
                            onClick={() => dropCourse(r.courseId)}
                            color="secondary"
                            variant="contained"
                        >
                            Drop
                        </Button>
                    ) : (
                        <Button
                            onClick={() => registerForCourse(r.courseId)}
                            color="primary"
                            variant="contained"
                        >
                            Register
                        </Button>
                    ),
            },
        ],
        [registeredCourseIds]
    )();

    return (
        <Grid container style={{ width: "100%" }}>
            <Grid item xs={12}>
                <DepartmentDropDown />
            </Grid>
            <Grid item xs={12}>
                <TableComponent rows={allCourses} columns={columns} />
            </Grid>
        </Grid>
    );
}
