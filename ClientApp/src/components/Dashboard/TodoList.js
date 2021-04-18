import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataProvider";

import TodoItem from "./TodoItem";

export default function TodoList() {
    const { assignments } = useContext(DataContext);
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        setTodoList(getSortedAssignments());
    }, []);

    const getSortedAssignments = () => {
        const sortedAssignments = assignments?.sort(function (a, b) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        if (sortedAssignments?.length > 6) {
            return sortedAssignments.slice(0, 6);
        }

        return sortedAssignments;
    };

    const handleTodoItemDelete = (id) => {
        let tempArray = [];
        if (todoList != undefined) {
            tempArray = todoList.filter((item) => item.assignmentId != id);
        }
        setTodoList(tempArray);
    };

    // sort assignments by due date, soonest due to furthest out
    // only show top 5-6

    return (
        <div>
            <List subheader="To Do">
                <Divider />
                {todoList?.map((assignment, index) => (
                    <TodoItem
                        key={`todoitem-${index}`}
                        assignment={assignment}
                        onDelete={handleTodoItemDelete}
                    />
                ))}
                <Divider />
            </List>
        </div>
    );
}
