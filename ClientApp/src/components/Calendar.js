import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // must come after FullCalendar import
import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';


function getCalEvents(course, ucLen)
{
    const dayNums = {m: 1, t:2, w:3, r:4, f:5};
    const daysOfWeek = course.meetingDays.toLowerCase().split('').map(d => dayNums[d]);
    console.log('Days: '+ daysOfWeek)
    var callEvents = [];
    for(var i = 0; i < ucLen; i++)
    {
        console.log("in loop")
        callEvents.push({
            title: course.courseName,
            startTime: course.startTime,
            endTime: course.endTime,
            daysOfWeek: daysOfWeek
        })
    }
    return callEvents;
}

export default function Calendar(){
    const { userCourses } = useContext(DataContext);

    var callEvents=[];
    userCourses.map(course => (
        callEvents = getCalEvents(course, userCourses.length)
    ))
    console.log(callEvents)

    return (
        
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={callEvents}
        />
    )
}

