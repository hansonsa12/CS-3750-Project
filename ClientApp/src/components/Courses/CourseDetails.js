import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthProvider';
import AssignmentForm from '../Assignments/AssignmentForm';
import MainView from '../MainView';
import TableComponent from '../TableComponent';

export default function CourseDetails() {
    const { isInstructor } = useContext(AuthContext);
    const { id } = useParams(); // get params from route url

    const actionProps = isInstructor ? {
        action: <AssignmentForm courseId={id} />,
        actionTooltip: "Add New Assignment"
    } : {};

    return (
        <MainView title={`Course ${id}`} {...actionProps}>
            {isInstructor && (
                <>
                    <TableComponent course />
                </>
            )}
        </MainView>
    )
}
