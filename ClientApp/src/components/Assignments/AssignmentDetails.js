import { Grid } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { getFormattedDateTime } from "../../helpers/helpers";
import DetailsContainer from "../DetailsContainer";
import { SectionHeaderItem } from "../FormComponents";
import MainView from "../MainView";
import AssignmentBarChart from "./AssignmentBarChart";
import AssignmentSubmissionsTable from "./AssignmentSubmissionsTable";
import SubmissionDetails from "./SubmissionDetails";

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

    const submission =
        isStudent && _.get(assignment, "assignmentSubmissions[0]");

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
                    >
                        {submission?.receivedScore && (
                            <AssignmentBarChart
                                assignment={assignment}
                                receivedScore={submission?.receivedScore}
                            />
                        )}
                    </DetailsContainer>
                </Grid>
                {isStudent && submission && (
                    <SubmissionDetails
                        submission={submission}
                        assignment={assignment}
                    />
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
