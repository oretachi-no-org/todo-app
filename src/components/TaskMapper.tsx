/* TaskMapper.tsx -- main group of tasks to be shown
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import TaskAdder from "./TaskAdder";
import TaskItem from "./TaskItem";
import { TaskModel, convertApiToTask } from "../models/TaskModel";
import TaskMapperActions from "../models/TaskMapperActions";
import taskMapperReducer from "../reducers/taskMapperReducer";
import completeTask from "../services/completeTask";
import getTasks from "../services/getTasks";

function TaskMapper({ listId }: { listId: string }) {
  const initialTasks: { [key: string]: TaskModel } = {};
  const [tasks, dispatch] = React.useReducer(taskMapperReducer, initialTasks);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    getTasks(listId)
      .then((res) => {
        setLoading(false);
        const newTasks = _.assign(
          {},
          ...res.map((item) => ({ [item.taskId]: convertApiToTask(item) }))
        );

        dispatch({ type: TaskMapperActions.SET, payload: newTasks });
      })
      .catch((err) => {
        setLoading(false);
        setFailed(true);
        console.error("Got error while trying to get tasks:", err);
      });
  }, [listId]);

  const setCompleted = React.useCallback(
    (taskId: string, x: boolean) => {
      completeTask(listId, taskId, x)
        .then(() =>
          dispatch({
            type: x
              ? TaskMapperActions.SET_COMPLETED
              : TaskMapperActions.UNSET_COMPLETED,
            payload: taskId,
          })
        )
        .catch((err) => console.error("Couldn't set complete status:", err));
    },
    [listId]
  );

  const deleter = React.useCallback((taskId: string) => {
    dispatch({
      type: TaskMapperActions.REMOVE,
      payload: taskId,
    });
  }, []);

  const notCompletedTasks = _.values(tasks).filter(
    (task) => !task.content.completed
  );
  const completedTasks = _.values(tasks).filter(
    (task) => task.content.completed
  );

  return (
    <Container>
      {loading ? (
        <Grid spacing={0} container alignItems="center" justify="center">
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      ) : failed ? (
        <Typography color="error" align="center" variant="h6">
          Loading failed
        </Typography>
      ) : (
        <>
          <Box>
            <TaskAdder
              listId={listId}
              adder={(task) =>
                dispatch({
                  type: TaskMapperActions.ADD,
                  payload: task,
                })
              }
            />
          </Box>
          {notCompletedTasks.length > 0 && (
            <Box my={1}>
              {notCompletedTasks.map((task) => (
                <TaskItem
                  {...task}
                  setCompleted={setCompleted}
                  deleter={deleter}
                  key={task.taskId}
                />
              ))}
            </Box>
          )}
          {completedTasks.length > 0 && (
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

export default TaskMapper;
