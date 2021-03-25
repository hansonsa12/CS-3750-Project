import { Button, ButtonGroup, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { getFormattedTime } from '../../helpers/constants';
import TableComponent from '../TableComponent';
import CourseForm from './CourseForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

export default function Courses({
    courses = []
}) {
    const history = useHistory();

    const [columns] = useState([
        ...["courseNumber", "courseName", "department", "buildingName", "roomNumber",
            "meetingDays"].map((attr) => ({ accessor: attr })),
        {
            header: "Time",
            accessor: (r) => (getFormattedTime(r.startTime, r.endTime))
        },
        {
            header: "Actions",
            accessor: (r) => (
                <ButtonGroup>
                    <CourseForm course={r} />
                    <DeleteConfirmationDialog courseName={r.columnName} />
                    <Button onClick={() => history.push(`courses/${r.courseId}/details`)}>
                        Details
                    </Button>
                </ButtonGroup>
            )
        }
    ]);

    return (
        <div>
            <TableComponent columns={columns} rows={courses}
                emptyMessage="No courses. Click the plus button to add some." />
        </div>

    )

}