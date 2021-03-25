import React from 'react'
import { useParams } from 'react-router'
import AssignmentForm from '../Assignments/AssignmentForm';
import MainView from '../MainView';

export default function CourseDetails() {
    const { id } = useParams();

    return (
        <MainView title={`Course ${id}`}>
            <AssignmentForm courseId={id} />
        </MainView>
    )
}
