/* taskListReducer.ts -- reducer for task list
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

import ListApiModel from "../models/ListApiModel";
import TaskListActions from "../models/TaskListActions";

type ReducerAddType = {
  type: TaskListActions.ADD;
  payload: ListApiModel;
};
type ReducerRemoveType = {
  type: TaskListActions.REMOVE;
  payload: string;
};
type ReducerEditType = {
  type: TaskListActions.EDIT;
  payload: ListApiModel;
};
type ReducerSetType = {
  type: TaskListActions.SET;
  payload: { [key: string]: ListApiModel };
};

type ReducerActionType =
  | ReducerAddType
  | ReducerRemoveType
  | ReducerEditType
  | ReducerSetType;

function taskListReducer(
  state: { [key: string]: ListApiModel },
  action: ReducerActionType
) {
  const newState = { ...state };

  switch (action.type) {
    case TaskListActions.ADD:
      newState[action.payload.id] = action.payload;
      break;

    case TaskListActions.REMOVE:
      delete newState[action.payload];
      break;

    case TaskListActions.EDIT:
      newState[action.payload.id] = action.payload;
      break;

    case TaskListActions.SET:
      return { ...action.payload };
  }
  return newState;
}

export default taskListReducer;
