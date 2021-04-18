import { Grid } from "@material-ui/core";
import React from "react";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren
} from "react-circular-progressbar";
import { getFileUrl, getFormattedDateTime } from "../../helpers/helpers";
import DetailsContainer from "../DetailsContainer";
import { SectionHeaderItem } from "../FormComponents";

export default function SubmissionDetails({ submission, assignment }) {
    const percentageScore =
        (submission?.receivedScore / assignment?.maxPoints) * 100;

    return (
        <>
            <SectionHeaderItem title="Submission Details" />
            <Grid item xs={12}>
                <DetailsContainer
                    object={submission}
                    omitProperties={[
                        "student",
                        "assignmentSubmissionId",
                        "assignmentId",
                        "studentId",
                        "fileName"
                    ]}
                    specialFormatters={{
                        submittedAt: s => getFormattedDateTime(s.submittedAt),
                        submission: s =>
                            s.fileName ? (
                                <a
                                    href={getFileUrl(
                                        s.studentId,
                                        "submission",
                                        s.fileName
                                    )}
                                    target="_blank"
                                >
                                    {s.submission}
                                </a>
                            ) : (
                                s.submission
                            ),
                        gradedAt: s => getFormattedDateTime(s.gradedAt),
                        receivedScore: s =>
                            s.receivedScore && assignment.maxPoints
                                ? `${s.receivedScore}/${assignment.maxPoints} (${percentageScore}%)`
                                : s.receivedScore
                                ? s.receivedScore
                                : "-"
                    }}
                >
                    <div
                        style={{
                            width: 180,
                            margin: "auto"
                        }}
                    >
                        {submission.receivedScore ? (
                            <CircularProgressbar
                                value={percentageScore}
                                text={
                                    percentageScore === Infinity
                                        ? `${submission.receivedScore}pts.`
                                        : `${percentageScore}%`
                                }
                            />
                        ) : (
                            <CircularProgressbarWithChildren>
                                Not Yet Graded
                            </CircularProgressbarWithChildren>
                        )}
                    </div>
                </DetailsContainer>
            </Grid>
        </>
    );
}
