import { Button, ButtonGroup } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { DataContext } from "../../context/DataProvider";
import { getFormattedTime } from "../../helpers/constants";
import TableComponent from "../TableComponent";
import CourseForm from "./CourseForm";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function Courses() {
    const { courses } = useContext(DataContext);
    const history = useHistory();

    const [columns] = useState([
        ...[
            "courseNumber",
            "courseName",
            "department",
            "buildingName",
            "roomNumber",
            "meetingDays",
        ].map(attr => ({ accessor: attr })),
        {
            header: "Time",
            accessor: r => getFormattedTime(r.startTime, r.endTime),
        },
        {
            header: "Actions",
            accessor: r => (
                <ButtonGroup>
                    <CourseForm course={r}>
                        <Button variant="contained" color="primary">
                            Edit
                        </Button>
                    </CourseForm>
                    <DeleteConfirmationDialog
                        courseName={r.courseName}
                        courseId={r.courseId}
                    />
                    <Button
                        onClick={() =>
                            history.push(`courses/${r.courseId}/details`)
                        }
                    >
                        Details
                    </Button>
                </ButtonGroup>
            ),
        },
    ]);

    return (
        <div>
            <TableComponent
                columns={columns}
                rows={courses}
                emptyMessage="No courses. Click the plus button to add some."
            />
        </div>
    );
}