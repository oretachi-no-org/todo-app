/* TaskGroup.tsx -- main group of tasks to be shown
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

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import TaskItem from "./TaskItem";
import TaskModel from "../models/TaskModel";
import TaskGroupActions from "../models/TaskGroupActions";
import taskGroupReducer from "../reducers/taskGroupReducer";
import getTasks from "../services/getTasks";
import convertApiToTask from "../models/convertApiToTask";

function TaskGroup({ listId }: { listId: string }) {
  const initialTasks: { [key: string]: TaskModel } = {};
  const [tasks, dispatch] = React.useReducer(taskGroupReducer, initialTasks);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    getTasks(listId)
      .then((res) => {
        setLoading(false);
        const newTasks = _.assign(
          {},
          ...res.map((item) => ({ [item.id]: convertApiToTask(item) }))
        );

        dispatch({ type: TaskGroupActions.SET, payload: newTasks });
      })
      .catch((res) => {
        setLoading(false);
        setFailed(true);
        console.log(`Got Error while trying to get tasks: ${res}`);
      });
  }, [listId]);

  const setCompleted = React.useCallback((taskId: string, x: boolean) => {
    dispatch({
      type: x
        ? TaskGroupActions.SET_COMPLETED
        : TaskGroupActions.UNSET_COMPLETED,
      payload: taskId,
    });
  }, []);

  const deleter = React.useCallback((taskId: string) => {
    dispatch({
      type: TaskGroupActions.REMOVE,
      payload: taskId,
    });
  }, []);

  const notCompletedTasks = Object.values(tasks).filter(
    (task) => !task.content.completed
  );
  const completedTasks = Object.values(tasks).filter(
    (task) => task.content.completed
  );

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : failed ? (
        <Typography color="error" align="center" variant="h6">
          Loading failed
        </Typography>
      ) : (
        <>
          {notCompletedTasks.length > 0 && (
            <>
              <Box mt={1} mb={1}>
                <Typography variant="h5">Remaining</Typography>
              </Box>
              <Divider />
              <Box mt={1} mb={4}>
                {notCompletedTasks.map((task) => (
                  <TaskItem
                    {...task}
                    setCompleted={setCompleted}
                    deleter={deleter}
                    key={task.taskId}
                  />
                ))}
              </Box>
            </>
          )}
          {completedTasks.length > 0 && (
            <>
              <Box mt={1} mb={1}>
                <Typography variant="h5">Completed</Typography>
              </Box>
              <Divider />
              <Box mt={1} mb={1}>
                {completedTasks.map((task) => (
                  <TaskItem
                    {...task}
                    setCompleted={setCompleted}
                    deleter={deleter}
                    key={task.taskId}
                  />
                ))}
              </Box>
            </>
          )}
          {completedTasks.length === 0 && notCompletedTasks.length === 0 && (
            <Typography variant="h4" align="center">
              Wow, Such Empty
            </Typography>
          )}
        </>
      )}
    </Container>
  );
}

export default TaskGroup;
