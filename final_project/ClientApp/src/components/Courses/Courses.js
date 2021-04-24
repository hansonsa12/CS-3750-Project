import { Button, ButtonGroup } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { getFormattedTime } from "../../helpers/helpers";
import TableComponent from "../TableComponent";
import CourseForm from "./CourseForm";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function Courses() {
    const { userCourses } = useContext(DataContext);

    const [columns] = useState([
        { accessor: "courseNumber" },
        {
            header: "Course Name",
            accessor: c => (
                <Link to={`courses/${c.courseId}/details`}>{c.courseName}</Link>
            )
        },
        ...[
            "department",
            "buildingName",
            "roomNumber",
            "meetingDays"
        ].map(attr => ({ accessor: attr })),
        {
            header: "Time",
            accessor: c => getFormattedTime(c.startTime, c.endTime)
        },
        {
            header: "Actions",
            accessor: c => (
                <ButtonGroup>
                    <CourseForm course={c}>
                        <Button variant="contained" color="primary">
                            Edit
                        </Button>
                    </CourseForm>
                    <DeleteConfirmationDialog
                        resourceName={c.courseName}
                        resourceId={c.courseId}
                        route="courses"
                        onDelete={() => window.location.reload()}
                    />
                </ButtonGroup>
            )
        }
    ]);

    return (
        <div>
            <TableComponent
                columns={columns}
                rows={userCourses}
                emptyMessage="No courses. Click the plus button to add some."
            />
        </div>
    );
}
