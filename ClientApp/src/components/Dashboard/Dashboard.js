import { Grid } from "@material-ui/core";
import React from "react";
import AssignmentForm from '../Assignments/AssignmentForm';
import CourseCardList from "./CourseCardList";
import TodoList from "./TodoList";

export default function Dashboard({
    courses = []
}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <CourseCardList courses={courses} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TodoList />
            </Grid>
        </Grid>
    );
}
