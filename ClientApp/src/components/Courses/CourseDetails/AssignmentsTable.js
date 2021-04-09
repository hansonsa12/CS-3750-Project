import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { getFormattedDateTime } from "../../../helpers/helpers";
import AssignmentForm from "../../Assignments/AssignmentForm";
import AssignmentSubmissionForm from "../../Assignments/AssignmentSubmissionForm";
import TableComponent from "../../TableComponent";

export default function AssignmentsTable({ course }) {
    const [assignments, setAssignments] = useState([]);
    const { authHeader, isInstructor } = useContext(AuthContext);

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

    const actions = useMemo(() => ({
        header: "Actions",
        accessor: a =>
            isInstructor ? (
                <AssignmentForm assignment={a}>
                    <Button variant="contained" color="primary">
                        Edit
                    </Button>
                </AssignmentForm>
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

    return <TableComponent columns={columns} rows={assignments} />;
}