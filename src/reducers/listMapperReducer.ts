/* listMapperReducer.ts -- reducer for task list
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
import ListMapperActions from "../models/ListMapperActions";

type ReducerAddType = {
  type: ListMapperActions.ADD;
  payload: ListApiModel;
};
type ReducerRemoveType = {
  type: ListMapperActions.REMOVE;
  payload: string;
};
type ReducerEditType = {
  type: ListMapperActions.EDIT;
  payload: ListApiModel;
};
type ReducerSetType = {
  type: ListMapperActions.SET;
  payload: { [key: string]: ListApiModel };
};

type ReducerActionType =
  | ReducerAddType
  | ReducerRemoveType
  | ReducerEditType
  | ReducerSetType;

function listMapperReducer(
  state: { [key: string]: ListApiModel },
  action: ReducerActionType
) {
  const newState = { ...state };

  switch (action.type) {
    case ListMapperActions.ADD:
      newState[action.payload.listId] = action.payload;
      break;

    case ListMapperActions.REMOVE:
      delete newState[action.payload];
      break;

    case ListMapperActions.EDIT:
      newState[action.payload.listId] = action.payload;
      break;

    case ListMapperActions.SET:
      return { ...action.payload };
  }
  return newState;
}

export default listMapperReducer;
