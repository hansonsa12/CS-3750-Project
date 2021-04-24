import { Button } from "@material-ui/core";
import React, { useMemo } from "react";
import { getFileUrl, getFormattedDateTime } from "../../helpers/helpers";
import TableComponent from "../TableComponent";
import AssignmentGradingForm from "./AssignmentGradingForm";

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
                <AssignmentGradingForm submission={s}>
                    <Button color="primary" variant="contained">
                        {s.receivedScore ? "Re-Grade" : "Grade"}
                    </Button>
                </AssignmentGradingForm>
            )
        }
    ]);
    return <TableComponent columns={columns} rows={rows} />;
}
