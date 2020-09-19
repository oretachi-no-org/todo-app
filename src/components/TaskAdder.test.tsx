/* TaskAdder.test.tsx -- testing task adder component
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
import { createMount } from "@material-ui/core/test-utils";
import CreateIcon from "@material-ui/icons/Create";

import TaskAdder from "./TaskAdder";
import { TaskModel, TaskContentModel } from "../models/TaskModel";

describe("<TaskAdder />", () => {
  let mount: typeof import("enzyme").mount;
  let mockTasks: { [key: string]: TaskModel };
  let mockTaskAdder: (task: TaskContentModel) => void;
  let mockUuid: number;

  beforeAll(() => {
    mount = createMount();
    mockTaskAdder = (task: TaskContentModel) => {
      mockTasks[mockUuid.toString()] = {
        taskId: mockUuid.toString(),
        content: task,
      };
      mockUuid++;
    };
  });

  beforeEach(() => {
    mockUuid = 0;
    mockTasks = {};
  });

  it("contains the add icon", () => {
    const wrapper = mount(<TaskAdder adder={mockTaskAdder} />);
    expect(wrapper.find(CreateIcon)).toHaveLength(1);
  });

  it("contains an text field, which is by default empty", () => {
    const wrapper = mount(<TaskAdder adder={mockTaskAdder} />);
    const inputField = wrapper.find("input");

    expect(inputField).not.toHaveLength(0);

    expect(inputField.at(0).props().value).toBe("");
  });
});
