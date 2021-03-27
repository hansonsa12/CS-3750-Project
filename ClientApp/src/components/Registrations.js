import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getFormattedTime } from '../helpers/constants';
import DepartmentDropDown from './Courses/DepartmentDropDown';
import TableComponent from './TableComponent';

export default function Registrations() {
    const [allCourses, setAllCourses] = useState([]);
    const [columns] = useState([
        { header: "Course Number", accessor: "courseNumber" },
        { header: "Title", accessor: "courseName" },
        { header: "Instructor", accessor: (r) => (`${r.instructor?.lastName}, ${r.instructor?.firstName}`) },
        { header: "Location", accessor: (r) => (`${r.buildingName}, ${r.roomNumber}`) },
        { header: "Time", accessor: (r) => (getFormattedTime(r.startTime, r.endTime)) },
        { header: "Meeting Days", accessor: "meetingDays" }
    ]);

    useEffect(() => {
        // get list of all courses
        setAllCourses(
            [
                {
                    courseId: 6,
                    courseName: "Advanced Database Programming",
                    courseNumber: "CS 3550",
                    instructorId: 1,
                    instructor: { firstName: "Joe", lastName: "Instructor" },
                    department: "Computer Science",
                    creditHours: 4,
                    description: "Learn how to do some advanced things with databases!",
                    buildingName: "Computer Science Building",
                    roomNumber: "CA 141",
                    meetingDays: "MWF",
                    startTime: "08:00 AM",
                    endTime: "11:30 AM",
                    maxCapacity: 35,
                    registrations: null,
                    assignment: null,
                },
            ]
        );
    }, []);


    return (
        <Grid container style={{ width: "100%" }}>
            <Grid item xs={12}>
                <DepartmentDropDown />
            </Grid>
            <Grid item xs={12}>
                <TableComponent rows={allCourses} columns={columns} />
            </Grid>
        </Grid>
    )
}
