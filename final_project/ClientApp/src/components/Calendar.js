import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // must come after FullCalendar import
import React, { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import dayjs from "dayjs";

export default function Calendar() {
    const { userCourses, assignments } = useContext(DataContext);

    const history = useHistory(); // https://reactrouter.com/web/api/Hooks

    const dayNums = { m: 1, t: 2, w: 3, r: 4, f: 5 };

    const events = useMemo(
        /* Optimization technique. Memoizes (caches) the array of events so that when this compoent 
    rerenders, the map function is only called again if the userCourses changes. Otherwise it
    just returns the cached array. https://reactjs.org/docs/hooks-reference.html#usememo */
        () => {
            const userEvents = userCourses
                ? userCourses.map((course) => ({
                      title: `${course.courseNumber} - ${course.courseName}`,
                      startTime: course.startTime,
                      endTime: course.endTime,
                      daysOfWeek: course.meetingDays
                          ?.toLowerCase()
                          .split("")
                          .map((d) => dayNums[d]),
                      url: `/courses/${course.courseId}/details`,
                  }))
                : [];

            const assignmentEvents = assignments
                ? assignments.map((assignment) => ({
                      // add properties that you need `
                      title: `${assignment.courseNumber} ${assignment.title}`,
                      date: dayjs(assignment.dueDate).format("YYYY-MM-DD"),
                      allDay: true,
                      url: `/courses/${assignment.courseId}/assignments/${assignment.assignmentId}/details`,
                  }))
                : [];

            return [...userEvents, ...assignmentEvents];
        },
        [userCourses, assignments]
    );

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(info) => {
                /* link event to its corresponding course page 
                https://fullcalendar.io/docs/eventClick */
                info.jsEvent.preventDefault();
                history.push(info.event.url);
            }}
        />
    );
}
