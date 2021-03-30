import { Grid, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import AssignmentForm from "../../Assignments/AssignmentForm";
import { SectionHeaderItem } from "../../FormComponents";
import MainView from "../../MainView";
import TableComponent from "../../TableComponent";
import CourseForm from "../CourseForm";
import DetailsContainer from "./DetailsContainer";

export default function CourseDetails() {
    const { isInstructor } = useContext(AuthContext);
    const { id } = useParams(); // get params from route url

    const { courses } = useContext(DataContext);

    const [course, setCourse] = useState({});

    useEffect(() => {
        setCourse(courses.find(c => c.courseId.toString() === id));
    }, [courses, id]);

    const actionProps = isInstructor
        ? {
              action: (
                  <CourseForm course={course}>
                      <IconButton>
                          <Edit />
                      </IconButton>
                  </CourseForm>
              ),
              actionTooltip: "Edit Course",
          }
        : {};

    return (
        <MainView title={course?.courseName} {...actionProps}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DetailsContainer
                        object={course}
                        omitValues={"instructorId registrations assignment".split(
                            " "
                        )}
                        specialFormatters={{
                            instructor: i => `${i.lastName}, ${i.firstName}`,
                        }}
                    />
                </Grid>
                {isInstructor && (
                    <>
                        <SectionHeaderItem
                            title="Assignments"
                            action={
                                <AssignmentForm courseId={course.courseId} />
                            }
                            actionTooltip="Add Assignment"
                        />
                        <Grid item xs={12}>
                            <TableComponent course />
                        </Grid>
                    </>
                )}
            </Grid>
        </MainView>
    );
}
