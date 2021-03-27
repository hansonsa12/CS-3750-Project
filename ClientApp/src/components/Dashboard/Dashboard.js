import { Grid } from "@material-ui/core";
import React from "react";
import CourseCardList from "./CourseCardList";
import TodoList from "./TodoList";

export default function Dashboard() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <CourseCardList />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TodoList />
            </Grid>
        </Grid>
    );
}
