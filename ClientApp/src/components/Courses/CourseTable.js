import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { getFormattedTime } from '../../helpers/constants';

export default function CourseTable ({
    courses = []
}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell align="right">Course Number</TableCell>
                        <TableCell align="right">Department</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell align="right">Room</TableCell>
                        <TableCell align="right">Days</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.length > 0 ? courses.map((course, index) => {
                        const { courseName, courseNumber, department, buildingName, 
                            roomNumber, meetingDays, startTime, endTime } = course;

                        return (<TableRow key={`course-${index}`}>
                            <TableCell component="th" scope="course">
                                {courseName}
                            </TableCell>
                            <TableCell align="right">{courseNumber}</TableCell>
                            <TableCell align="right">{department}</TableCell>
                            <TableCell align="right">{buildingName}</TableCell>
                            <TableCell align="right">{roomNumber}</TableCell>
                            <TableCell align="right">{meetingDays}</TableCell>
                            <TableCell align="right">{getFormattedTime(startTime, endTime)}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="primary">Edit</Button>
                                <Button variant="contained" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>)
                    }) : <TableRow><TableCell colSpan={8} align="center">No courses</TableCell></TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}