import { Button } from "@material-ui/core";
import React, { useMemo } from "react";
import { getFileUrl, getFormattedDateTime } from "../../helpers/helpers";
import TableComponent from "../TableComponent";

export default function AssignmentSubmissionsTable({ rows }) {
    const columns = useMemo(() => [
        {
            accessor: "studentId"
        },
        {
            header: "Submission",
            accessor: s =>
                s.fileName ? (
                    <a
                        href={getFileUrl(s.studentId, "submission", s.fileName)}
                        target="_blank"
                    >
                        {s.submission}
                    </a>
                ) : (
                    s.submission
                )
        },
        {
            header: "Submitted At",
            accessor: s => getFormattedDateTime(s.submittedAt)
        },
        {
            header: "Score",
            accessor: s => s.receivedScore || "-",
            alignValues: "center"
        },
        {
            header: "Graded At",
            accessor: s => getFormattedDateTime(s.gradedAt)
        },
        {
            header: "Action",
            accessor: s => (
                <Button color="primary" variant="contained">
                    Grade
                </Button>
            )
        }
    ]);
    return <TableComponent columns={columns} rows={rows} />;
}
