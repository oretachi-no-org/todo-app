/* convertApiToTask.ts -- converts TaskApiModel to TaskModel
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

import TaskApiModel from "../models/TaskApiModel";
import TaskModel from "../models/TaskModel";

function convertApiToTask(task: TaskApiModel): TaskModel {
  const { id, title, completed, description, dueDate } = task;

  return {
    taskId: id,
    content: {
      title: title,
      completed: completed,
      details: description,
      deadline: dueDate,
    },
  };
}

export default convertApiToTask;
