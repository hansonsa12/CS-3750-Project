import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { DataContext } from "../../context/DataProvider";
import { getFormattedLocation, getFormattedTime } from "../../helpers/helpers";
import TableComponent from "../TableComponent";

export default function RegistrationsTable({ rows }) {
    const { authHeader } = useContext(AuthContext);
    const { setUserCourses, registeredCourseIds } = useContext(DataContext);

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

    const columns = useMemo(
        () => [
            { header: "Course Number", accessor: "courseNumber" },
            {
                header: "Course Name",
                accessor: c =>
                    registeredCourseIds.includes(c.courseId) ? (
                        <Link to={`courses/${c.courseId}/details`}>
                            {c.courseName}
                        </Link>
                    ) : (
                        c.courseName
                    )
            },
            { accessor: "department" },
            {
                header: "Instructor",
                accessor: r =>
                    `${r.instructor?.lastName}, ${r.instructor?.firstName}`
            },
            {
                header: "Location",
                accessor: r =>
                    getFormattedLocation(r.buildingName, r.roomNumber)
            },
            {
                header: "Time",
                accessor: r => getFormattedTime(r.startTime, r.endTime)
            },
            { header: "Meeting Days", accessor: "meetingDays" },
            {
                header: "Action",
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
                    )
            }
        ],
        [registeredCourseIds]
    );
    return (
        <TableComponent
            rows={rows}
            columns={columns}
            emptyMessage="No courses matching specified criteria."
        />
    );
}
