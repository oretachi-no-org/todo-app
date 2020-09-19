/* taskMapperReducer.ts -- reducer for managing task group
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

import { TaskModel } from "../models/TaskModel";
import TaskMapperActions from "../models/TaskMapperActions";

type ReducerAddType = {
  type: TaskMapperActions.ADD;
  payload: TaskModel;
};
type ReducerRemoveType = {
  type: TaskMapperActions.REMOVE;
  payload: string;
};
type ReducerSetType = {
  type: TaskMapperActions.SET;
  payload: { [key: string]: TaskModel };
};
type ReducerSetCompletedType = {
  type: TaskMapperActions.SET_COMPLETED;
  payload: string;
};
type ReducerUnsetCompletedType = {
  type: TaskMapperActions.UNSET_COMPLETED;
  payload: string;
};
type ReducerActionType =
  | ReducerAddType
  | ReducerRemoveType
  | ReducerSetType
  | ReducerSetCompletedType
  | ReducerUnsetCompletedType;

function taskMapperReducer(
  state: { [key: string]: TaskModel },
  action: ReducerActionType
) {
  const newState = { ...state };
  switch (action.type) {
    case TaskMapperActions.ADD:
      newState[action.payload.taskId] = action.payload;
      break;

    case TaskMapperActions.REMOVE:
      delete newState[action.payload];
      break;

    case TaskMapperActions.SET:
      return { ...action.payload };

    case TaskMapperActions.SET_COMPLETED:
      newState[action.payload].content.completed = true;
      return newState;

    case TaskMapperActions.UNSET_COMPLETED:
      newState[action.payload].content.completed = false;
      break;
  }

  return newState;
}

export default taskMapperReducer;
