import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { getFormattedDateTime } from "../../helpers/helpers";
import DetailsContainer from "../DetailsContainer";
import { SectionHeaderItem } from "../FormComponents";
import MainView from "../MainView";
import AssignmentSubmissionsTable from "./AssignmentSubmissionsTable";

export default function AssignmentDetails() {
    const { assignmentId } = useParams(); // get params from route url

    const { authHeader, isInstructor } = useContext(AuthContext);

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

    return (
        <MainView title={assignment?.title}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DetailsContainer
                        object={assignment}
                        omitProperties={["assignmentSubmissions"]}
                        specialFormatters={{
                            dueDate: d => getFormattedDateTime(d)
                        }}
                    />
                </Grid>
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
