import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const { assignments } = useContext(DataContext);

    return (
        <div>
            <List subheader="To Do">
                <Divider />
                {assignments?.map((assignment, index) => (
                    <TodoItem
                        key={`todoitem-${index}`}
                        assignment={assignment}
                    />
                ))}
                <Divider />
            </List>
        </div>
    );
}
