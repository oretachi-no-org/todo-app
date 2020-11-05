/* createTask.ts -- service to create new task
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

import axiosInstance from "./axiosInstance";
import {
  convertApiToTask,
  TaskContentModel,
  TaskApiModel,
  TaskModel,
} from "../models/TaskModel";
import { AxiosResponse } from "axios";

function createTask(
  listId: string,
  content: TaskContentModel
): Promise<TaskModel> {
  return new Promise<TaskModel>((resolve, reject) => {
    axiosInstance()
      .post<TaskContentModel, AxiosResponse<TaskApiModel>>(
        `/todo/lists/${listId}/tasks/`,
        content
      )
      .then((res) => resolve(convertApiToTask(res.data)))
      .catch((err) => reject(err));
  });
}

export default createTask;
