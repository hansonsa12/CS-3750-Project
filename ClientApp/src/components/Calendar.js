import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // must come after FullCalendar import
import React from 'react';

export default class Calendar extends React.Component {
    render() {
        return (
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Pre-Team Meeting', date: '2021-02-24' },
                    { title: 'Team Meeting', date: '2021-02-25' }
                ]}
            />
        )
    }
}