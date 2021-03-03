import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

          AssignmentList().map((assignment) => (

            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <div>
              <ListItemText primary={assignment[0]}  />
                <Link href="#Assignment" color="blue">
                  {assignment[1]}
                </Link>

                <ListItemText primary={assignment[2]} />
              </div>
              <IconButton edge="end" aria-label="close">
                <CloseIcon />
              </IconButton>
            </ListItem>))}
        <Divider />
      </List>
    </div>

  );

}
