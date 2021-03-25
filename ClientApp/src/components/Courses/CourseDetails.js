import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../../context/AuthProvider';
import AssignmentForm from '../Assignments/AssignmentForm';
import MainView from '../MainView';

export default function CourseDetails() {
    const { isInstructor } = useContext(AuthContext);
    const { id } = useParams(); // get params from route url

    return (
        <MainView title={`Course ${id}`}>
            {isInstructor && <AssignmentForm courseId={id} />}
        </MainView>
    )
}
