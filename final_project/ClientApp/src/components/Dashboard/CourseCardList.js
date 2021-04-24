import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import CourseCard from "./CourseCard";

export default function CourseCardList() {
    const { userCourses } = useContext(DataContext);

    return userCourses && userCourses.length > 0 ? (
        <Grid container spacing={2}>
            {userCourses.map(course => (
                <Grid key={`courseitem-${course.courseId}`} item xs={12}>
                    <CourseCard {...course} />
                </Grid>
            ))}
        </Grid>
    ) : (
        <div>No Courses</div>
    );
}
