import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { DataContext } from "../../context/DataProvider";

export default function CourseFinalGrade({ course }) {
    const { isInstructor } = useContext(AuthContext);
    const { assignments, submissions } = useContext(DataContext);
    const [finalGrade, setFinalGrade] = useState();

    useEffect(() => {
        const grade = getFinalGrade();
        setFinalGrade(grade);
    }, [course]);

    const getFinalGrade = () => {
        if (!isInstructor) {
            //get assignments for this course
            const assignmentList = assignments.filter(
                (a) => a.courseId == course.courseId
            );
            let totalPoints = 0;
            let totalReceivedScore = 0;
            if (assignmentList.length > 0) {
                assignmentList.forEach((assignment) => {
                    //get submission for assignment
                    const assignmentSubmission = submissions?.filter(
                        (a) => a.assignmentId == assignment.assignmentId
                    );

                    if (assignmentSubmission[0]?.receivedScore != null) {
                        totalPoints += assignment.maxPoints;
                        totalReceivedScore +=
                            assignmentSubmission[0]?.receivedScore;
                    }
                });

                let score = 0;
                if (totalPoints > 0)
                    score = (100 * (totalReceivedScore / totalPoints)).toFixed( 2 );
                return score;
            }
        }
    };
    return <div>{isInstructor ? "" : "Final grade :" + finalGrade + "%"}</div>;
}
