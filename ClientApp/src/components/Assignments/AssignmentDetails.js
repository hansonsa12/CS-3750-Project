import { Grid } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren
} from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { getFileUrl, getFormattedDateTime } from "../../helpers/helpers";
import DetailsContainer from "../DetailsContainer";
import { SectionHeaderItem } from "../FormComponents";
import MainView from "../MainView";
import AssignmentSubmissionsTable from "./AssignmentSubmissionsTable";

export default function AssignmentDetails() {
    const { assignmentId } = useParams(); // get params from route url

    const { authHeader, isInstructor, isStudent } = useContext(AuthContext);

    const [assignment, setAssigment] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `api/assignments/${assignmentId}`,
                authHeader
            );
            setAssigment(res.data);
        };
        fetchData();
    }, [assignmentId]);

    const submission = _.get(assignment, "assignmentSubmissions[0]");

    const percentageScore =
        (submission?.receivedScore / assignment?.maxPoints) * 100;

    return (
        <MainView title={assignment?.title}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DetailsContainer
                        object={assignment}
                        omitProperties={[
                            "assignmentSubmissions",
                            "assignmentId",
                            "courseId",
                            "title"
                        ]}
                        specialFormatters={{
                            dueDate: a => getFormattedDateTime(a.dueDate)
                        }}
                    />
                </Grid>
                {isStudent && submission && (
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
                                    submittedAt: s =>
                                        getFormattedDateTime(s.submittedAt),
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
                                    gradedAt: s =>
                                        getFormattedDateTime(s.gradedAt),
                                    receivedScore: s =>
                                        `${s.receivedScore}/${assignment.maxPoints} (${percentageScore}%)`
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
                                            text={`${percentageScore}%`}
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
                )}
                {isInstructor && (
                    <>
                        <SectionHeaderItem title="Submissions" />
                        <Grid item xs={12}>
                            <AssignmentSubmissionsTable
                                rows={assignment.assignmentSubmissions}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </MainView>
    );
}
