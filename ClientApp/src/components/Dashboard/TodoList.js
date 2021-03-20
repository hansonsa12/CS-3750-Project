import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import React from 'react';
import TodoItem from './TodoItem';

function AssignmentList() {
  var date = new Date(2020, 2, 10, 11, 59);
  var assignments = [["CS3750", "Assignment 1", date.toString()], ["CS3230","Assignment 2", date.toString()], ["CS3550","Assignment 3", date.toString()],
                    ["CS3540", "Assignment 4", date.toString()], ["CS3230","Assignment 3", date.toString()], ["CS3230","Assignment 4", date.toString()],
                    ["CS3550","Assignment 4", date.toString()], ["CS3750","Assignment 2", date.toString()],  ["CS3540","Assignment 5", date.toString()]];
  return assignments;
}



export default function TodoList() {


  return (
    <div >
      <List subheader="To Do">
        <Divider />
        {

          AssignmentList().map((assignment, index) => <TodoItem key={`todoitem-${index}`} assignment={assignment} />)}
        <Divider />
      </List>
    </div>

  );

}
