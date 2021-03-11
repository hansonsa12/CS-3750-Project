import React, { Component } from 'react'
import CourseForm from "./CourseForm";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

function createData(courseName, courseNumber, department, location, room, days, time) {
    return {courseName, courseNumber, department, location, room, days, time}

}

const rows = [
    createData('Advanced Databases', 'CS 3550', 'CS', 'Building D2', '306', 'MTWR', '10:30 - 11:30'),
    createData('Advanced Databases', 'CS 3550', 'CS', 'Building D2', '306', 'MTWR', '10:30 - 11:30'),
    createData('Advanced Databases', 'CS 3550', 'CS', 'Building D2', '306', 'MTWR', '10:30 - 11:30'),
    createData('Advanced Databases', 'CS 3550', 'CS', 'Building D2', '306', 'MTWR', '10:30 - 11:30'),
    createData('Advanced Databases', 'CS 3550', 'CS', 'Building D2', '306', 'MTWR', '10:30 - 11:30'),
    createData('Advanced Databases', 'CS 3550', 'CS', 'Building D2', '306', 'MTWR', '10:30 - 11:30'),
]

export default function BasicTable(){
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.courseName}
                </TableCell>
                <TableCell align="right">{row.courseNumber}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.room}</TableCell>
                <TableCell align="right">{row.days}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">
                  <Button variant= "contained" color="primary">Edit</Button>
                  <Button variant="contained" color="secondary">Delete</Button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}