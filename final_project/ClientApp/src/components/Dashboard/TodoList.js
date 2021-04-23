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
        // Get all assignments in chronological order
        const sortedAssignments = assignments?.sort(function (a, b) {          
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        // Get today's date and format it to fit with dueDate
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-'+ mm + '-' + dd;

        var futureAssignments =[];
        // Only keep items with a due date of today or later
        for(var i = 0; i < sortedAssignments.length; i++){
            if(sortedAssignments[i].dueDate >= today)
            {
                futureAssignments.push(sortedAssignments[i])
            }
        }
        // Show only 6 assignments
        if(futureAssignments?.length > 6){
            return sortedAssignments.slice(0,6);
        }
        return futureAssignments;
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
