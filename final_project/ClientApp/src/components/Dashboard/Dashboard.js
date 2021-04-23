import { Grid } from "@material-ui/core";
import { AuthContext } from "../../context/AuthProvider";
import React, {useContext } from "react";
import CourseCardList from "./CourseCardList";
import TodoList from "./TodoList";

export default function Dashboard() {

    const { isInstructor } = useContext(AuthContext);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <CourseCardList />
            </Grid>
            <Grid item xs={12} sm={4}>
                {!isInstructor && <TodoList /> } 
            </Grid>
        </Grid>
    );
}
