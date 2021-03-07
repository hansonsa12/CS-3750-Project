import React from 'react'
import CourseCardList from './CourseCardList';
import TodoList from "./TodoList";

export default function Dashboard() {
    return (
        <div>
            <CourseCardList />
            <TodoList />
        </div>
    )
}
