import React from 'react'
import CourseCard from './CourseCard';

export default function CourseCardList() {
    const courses = [
        {
            courseNumber: "CS 3550",
            courseName: "Advanced Database Programming",
            instructorName: "Instructor Name",
            roomNumber: "CA 141",
            startTime: "8:00 AM",
            endTime: "10:30 AM",
        },
        {
            courseNumber: "CS 3750",
            courseName: "Software Engineering II",
            instructorName: "Instructor Name",
            roomNumber: "CA 155",
            startTime: "8:00 AM",
            endTime: "10:30 AM",
        },
        {
            courseNumber: "CS 3540",
            courseName: "Database Administration",
            instructorName: "Instructor Name",
            roomNumber: "CA 175",
            startTime: "8:00 AM",
            endTime: "10:30 AM",
        },
        {
            courseNumber: "CS 3230",
            courseName: "Object Oriented User Interface Development with Java",
            instructorName: "Instructor Name",
            roomNumber: "CA 240",
            startTime: "8:00 AM",
            endTime: "10:30 AM",
        },
    ];
    return (
        <div>
            {courses.map((course) => (
                <>
                    <CourseCard {...course} />
                    <br />
                </>
            ))}
        </div>
    )
}
