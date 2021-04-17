import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import { getFormattedDateTime } from "../../../helpers/helpers";
import AssignmentForm from "../../Assignments/AssignmentForm";
import AssignmentSubmissionForm from "../../Assignments/AssignmentSubmissionForm";
import TableComponent from "../../TableComponent";

export default function AssignmentsTable({ course }) {
    const [assignments, setAssignments] = useState([]);
    const { authHeader, isInstructor } = useContext(AuthContext);
    const { submissions } = useContext(DataContext);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `api/courses/${course.courseId}/assignments`,
                authHeader
            );
            setAssignments(res.data);
        };
        fetchData();
    }, [course]);

    const assignmentSubmissions = useMemo(
        () =>
            assignments.map(a => ({
                ...a,
                submission: submissions?.find(
                    s => s.assignmentId === a.assignmentId
                )
            })),
        [assignments, submissions]
    );

    const actions = useMemo(() => ({
        header: "Actions",
        accessor: a =>
            isInstructor ? (
                <AssignmentForm assignment={a}>
                    <Button variant="contained" color="primary">
                        Edit
                    </Button>
                </AssignmentForm>
            ) : a.submission ? (
                <Button variant="contained" color="primary" disabled>
                    Submitted
                </Button>
            ) : (
                <AssignmentSubmissionForm assignment={a}>
                    <Button variant="contained" color="primary">
                        Submit
                    </Button>
                </AssignmentSubmissionForm>
            )
    }));

    const columns = useMemo(() => [
        {
            header: "Title",
            accessor: a => (
                <Link to={`assignments/${a.assignmentId}/details`}>
                    {a.title}
                </Link>
            )
        },
        {
            header: "Due Date",
            accessor: a => getFormattedDateTime(a.dueDate)
        },
        { header: "Type", accessor: "assignmentType" },

        actions
    ]);

    return <TableComponent columns={columns} rows={assignmentSubmissions} />;
}
