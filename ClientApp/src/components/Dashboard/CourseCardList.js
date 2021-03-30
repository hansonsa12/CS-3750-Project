import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import CourseCard from './CourseCard';

export default function CourseCardList() {
    const { courses } = useContext(DataContext);
    return (
        courses && courses.length > 0 ? (
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
