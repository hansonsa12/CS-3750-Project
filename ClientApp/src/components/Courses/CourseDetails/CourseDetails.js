import { Grid, IconButton } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import { getFormattedInstructorName } from "../../../helpers/helpers";
import AssignmentForm from "../../Assignments/AssignmentForm";
import DetailsContainer from "../../DetailsContainer";
import { SectionHeaderItem } from "../../FormComponents";
import MainView from "../../MainView";
import CourseForm from "../CourseForm";
import AssignmentsTable from "./AssignmentsTable";

export default function CourseDetails() {
    const { isInstructor } = useContext(AuthContext);
    const { id } = useParams(); // get params from route url

    const { userCourses } = useContext(DataContext);

    const [course, setCourse] = useState({});

    useEffect(() => {
        setCourse(userCourses.find(c => c.courseId.toString() === id));
    }, [userCourses, id]);

    const actionProps = isInstructor
        ? {
              action: (
                  <CourseForm course={course}>
                      <IconButton>
                          <Edit />
                      </IconButton>
                  </CourseForm>
              ),
              actionTooltip: "Edit Course"
          }
        : {};

    return (
        <MainView title={course?.courseName} {...actionProps}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DetailsContainer
                        object={course}
                        omitProperties={"instructorId registrations assignment".split(
                            " "
                        )}
                        specialFormatters={{
                            // TODO Ky: Add missing instructor info to student registrations
                            instructor: i => getFormattedInstructorName(i || {})
                        }}
                    />
                </Grid>
                <SectionHeaderItem
                    title="Assignments"
                    action={
                        isInstructor && (
                            <AssignmentForm courseId={course.courseId}>
                                <IconButton size="small">
                                    <Add fontSize="small" />
                                </IconButton>
                            </AssignmentForm>
                        )
                    }
                    actionTooltip="Add Assignment"
                />
                <Grid item xs={12}>
                    <AssignmentsTable course={course} />
                </Grid>
            </Grid>
        </MainView>
    );
}
