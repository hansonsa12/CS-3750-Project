import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { getFormattedTime } from '../../helpers/constants';
import TableComponent from '../TableComponent';
import CourseForm from './CourseForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

export default function Assignment({
    assignments = []
}) {
    //?? What does this do
    const history = useHistory();

    const [columns] = useState([

        //...["courseNumber", "courseName", "department", "buildingName", "roomNumber",
        //"meetingDays"].map((attr) => ({ accessor: attr })),


        ...["Title", "description", "MaxPoints", "AssignmentType", "DueDate"].map((attr) => ({ accessor : attr})),
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
                emptyMessage="No Assignments. Click the plus button to add some." />
        </div>

    )
}