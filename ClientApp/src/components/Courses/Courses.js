import React from 'react'
import CourseForm from "./CourseForm";
import CourseTable from "./CourseTable";

export default function Courses({
    courses = []
}) {

    return (
        <div>
            <CourseForm />
            <CourseTable courses={courses} />
        </div>

    )

}