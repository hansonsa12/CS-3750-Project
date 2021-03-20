import { Grid } from '@material-ui/core';
import React from 'react';
import CourseCard from './CourseCard';

export default function CourseCardList({
    courses = []
}) {
    return (
        courses.length > 0 ? (
            <Grid container spacing={2}>
                {courses.map((course) => (
                    <Grid key={`courseitem-${course.courseId}`} item xs={12}>
                        <CourseCard {...course} />
                    </Grid>
                ))}
            </Grid>
        ) : <div>No Courses</div>
    )
}
