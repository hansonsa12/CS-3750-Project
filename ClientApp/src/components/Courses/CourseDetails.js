import { Grid } from '@material-ui/core';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthProvider';
import { DataContext } from '../../context/DataProvider';
import AssignmentForm from '../Assignments/AssignmentForm';
import MainView from '../MainView';
import TableComponent from '../TableComponent';

export default function CourseDetails() {
    const { isInstructor } = useContext(AuthContext);
    const { id } = useParams(); // get params from route url

    const { courses } = useContext(DataContext);

    const [course, setCourse] = useState({});

    useEffect(() => {
        setCourse(courses.find((c) => c.courseId.toString() === id))
    }, [courses])



    const actionProps = isInstructor ? {
        action: <AssignmentForm courseId={id} />,
        actionTooltip: "Add New Assignment"
    } : {};

    return (
        <MainView title={course?.courseName} {...actionProps}>
            {isInstructor && (
                <>
                    <TableComponent course />
                </>
            )}
        </MainView>
    )
}
