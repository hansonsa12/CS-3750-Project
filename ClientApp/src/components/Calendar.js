import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // must come after FullCalendar import
import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';


function getCalEvents(course)
{
    // Used to convert days (letters on db) to numbers for FullCalendar
    const dayNums = {m: 1, t:2, w:3, r:4, f:5};
    // Used when do dates are selected to appear on Sunday
    const daysOfWeek = course.meetingDays != '' ? course.meetingDays.toLowerCase().split('').map(d => dayNums[d]) : [7];
    var callEvents = [];

    // Grabs all the information needed from the db & sets a default value if the db is blank
    const name = course.courseName != null ? course.courseName :'DANCE_PARTY_DEFAULT';
    const building = course.buildingName != null ? course.buildingName : 'BUILDING_DEFAULT';
    const room = course.roomNumber != null ? course.roomNumber : 'ROOMNUMBER_DEFAULT';
    const start = course.startTime != null ? course.startTime : '00:00';
    const end = course.endTime != null ? course.endTime : '00:00';

    // Add event to array
    callEvents.push({
        title: name + ' ' + building + ' Room: ' + room,
        startTime: start,
        endTime : end,
        daysOfWeek: daysOfWeek
    })
    //return array of a single course
    return callEvents;
}

export default function Calendar(){
    // Get courses tied to the user from context
    const { userCourses } = useContext(DataContext);

    var callEvents=[];
    // tempArray is used to concatanate 2 arrays
    var tempArray=[];
    userCourses.map(course => (
        // combines tempArray(holds all courses loaded) with the new course from getCalEvents
        callEvents = tempArray.concat(getCalEvents(course)),
        // store callEvents into temp in order to keep concatanating arrays.
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

