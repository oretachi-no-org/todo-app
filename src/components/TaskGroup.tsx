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
import { useParams } from "react-router-dom";

import TaskItem from "./TaskItem";
import TaskModel from "../models/TaskModel";
import TaskGroupActions from "../models/TaskGroupActions";
import taskGroupReducer from "../reducers/taskGroupReducer";
import getTasks from "../services/getTasks";
import convertApiToTask from "../models/convertApiToTask";

function TaskGroup() {
  const { listId } = useParams();
  const initialTasks: { [key: string]: TaskModel } = {};
  const [tasks, dispatch] = React.useReducer(taskGroupReducer, initialTasks);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    getTasks(listId)
      .then((res) => {
        setLoading(false);
        const newTasks = _.reduce(
          res,
          (result: { [key: string]: TaskModel }, item) => {
            result[item.id] = convertApiToTask(item);
            return result;
          },
          {}
        );
        dispatch({
          type: TaskGroupActions.SET,
          payload: newTasks,
        });
      })
      .catch((result: Error) => {
        setLoading(false);
        setFailed(true);
        console.log(`Got Error: ${result.message}`);
        console.log(`Error Stack: ${result.stack}`);
      });
  }, [listId]);

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
          <Typography variant="h5">Remaining</Typography>
          <Divider />
          <Box mt={1} mb={2}>
            {Object.values(tasks)
              .filter((task) => !task.content.completed)
              .map((task) => (
                <TaskItem
                  {...task}
                  setter={(x: boolean) =>
                    dispatch({
                      type: x
                        ? TaskGroupActions.SET_COMPLETED
                        : TaskGroupActions.UNSET_COMPLETED,
                      payload: task.taskId,
                    })
                  }
                  key={task.taskId}
                />
              ))}
          </Box>
          <Typography variant="h5">Completed</Typography>
          <Divider />
          <Box mt={1} mb={2}>
            {Object.values(tasks)
              .filter((task) => task.content.completed)
              .map((task) => (
                <TaskItem
                  {...task}
                  setter={(x: boolean) =>
                    dispatch({
                      type: x
                        ? TaskGroupActions.SET_COMPLETED
                        : TaskGroupActions.UNSET_COMPLETED,
                      payload: task.taskId,
                    })
                  }
                  key={task.taskId}
                />
              ))}
          </Box>
        </>
      )}
    </Container>
  );
}

export default TaskGroup;
