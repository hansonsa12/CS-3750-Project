import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // must come after FullCalendar import
import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';


function getCalEvents(course)
{
    const dayNums = {m: 1, t:2, w:3, r:4, f:5};
    const daysOfWeek = course.meetingDays.toLowerCase().split('').map(d => dayNums[d]);
    var callEvents = [];

    const name = course.courseName;
    const building = course.buildingName != null ? course.buildingName : 'BUILDING_DEFAULT';
    const room = course.roomNumber != null ? course.roomNumber : 'ROOMNUMBER_DEFAULT';
    const start = course.startTime != null ? course.startTime : '00:00';
    const end = course.endTime != null ? course.endTime : '00:00';

    callEvents.push({
        title: name + ' ' + building + ' Room: ' + room,
        startTime: start,
        endTime : end,
        daysOfWeek: daysOfWeek != null ? daysOfWeek : null
    })
    return callEvents;
}

export default function Calendar(){
    const { userCourses } = useContext(DataContext);

    var callEvents=[];
    var tempArray=[];
    userCourses.map(course => (
        callEvents = tempArray.concat(getCalEvents(course)),
        tempArray = callEvents
    ))

    return (
        
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={callEvents}
        />
    )
}

