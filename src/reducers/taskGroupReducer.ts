/* taskGroupReducer.ts -- reducer for managing task group
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

import TaskModel from "../models/TaskModel";
import TaskGroupActions from "../models/TaskGroupActions";

type ReducerAddType = {
  type: TaskGroupActions.ADD;
  payload: TaskModel;
};
type ReducerRemoveType = {
  type: TaskGroupActions.REMOVE;
  payload: string;
};
type ReducerSetType = {
  type: TaskGroupActions.SET;
  payload: { [key: string]: TaskModel };
};
type ReducerSetCompletedType = {
  type: TaskGroupActions.SET_COMPLETED;
  payload: string;
};
type ReducerUnsetCompletedType = {
  type: TaskGroupActions.UNSET_COMPLETED;
  payload: string;
};
type ReducerActionType =
  | ReducerAddType
  | ReducerRemoveType
  | ReducerSetType
  | ReducerSetCompletedType
  | ReducerUnsetCompletedType;

function taskGroupReducer(
  state: { [key: string]: TaskModel },
  action: ReducerActionType
) {
  const newState = { ...state };
  switch (action.type) {
    case TaskGroupActions.ADD:
      newState[action.payload.taskId] = action.payload;
      return newState;

    case TaskGroupActions.REMOVE:
      delete newState[action.payload];
      return newState;

    case TaskGroupActions.SET:
      return action.payload;

    case TaskGroupActions.SET_COMPLETED:
      newState[action.payload].content.completed = true;
      return newState;

    case TaskGroupActions.UNSET_COMPLETED:
      newState[action.payload].content.completed = false;
      return newState;
  }
}

export default taskGroupReducer;
