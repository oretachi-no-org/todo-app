/* TaskList.tsx -- component listing all tasks
   Copyright (C) 2020  Rishvic Pushpakaran

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

/* Written by Rishvic Pushpakaran. */

import React from "react";
import _ from "lodash";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import ListIcon from "@material-ui/icons/List";

import { Link as RouterLink, useParams } from "react-router-dom";

import TaskListActions from "../models/TaskListActions";
import taskListReducer from "../reducers/taskListReducer";
import getLists from "../services/getLists";

function TaskList({ listId }: { listId: string }) {
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [lists, dispatch] = React.useReducer(taskListReducer, {});

  React.useEffect(() => {
    getLists()
      .then((res) => {
        setLoading(false);
        const newLists = _.assign(
          {},
          ...res.map((listItem) => ({ [listItem.id]: listItem }))
        );

        dispatch({ type: TaskListActions.SET, payload: newLists });
      })
      .catch((res) => {
        setLoading(false);
        setFailed(true);
        console.log(`Got Error while trying to get lists: ${res}`);
      });
  }, []);

  console.log(listId);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : failed ? (
        <Typography color="error" align="center" variant="h6">
          Loading failed
        </Typography>
      ) : (
        <List aria-label="task lists">
          {_.values(lists).map((listItem) => (
            <ListItem
              button
              selected={listItem.id === listId}
              component={RouterLink}
              to={`/list/${listItem.id}`}
              key={listItem.id}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={listItem.name} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default TaskList;
