import { Button } from "@material-ui/core";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AssignmentForm from "../../Assignments/AssignmentForm";
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
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            )
    }));

    const columns = useMemo(() => [
        { accessor: "title" },
        {
            header: "Due Date",
            accessor: a =>
                a.dueDate
                    ? dayjs(a.dueDate).format("MM/DD/YYYY hh:mm A")
                    : "n/a"
        },
        { header: "Type", accessor: "assignmentType" },

        actions
    ]);

    return <TableComponent columns={columns} rows={assignments} />;
}
