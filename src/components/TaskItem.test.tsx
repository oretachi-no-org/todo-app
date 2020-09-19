/* TaskItem.test.tsx -- testing todo tab pane
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
import TaskItem from "./TaskItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

describe("<TaskItem />", () => {
  let mount: typeof import("enzyme").mount;
  let mockCompleted: boolean;
  let mockSetterCompleted: (taskId: string, x: boolean) => void;
  let mockDeleter: (taskId: string) => void;

  beforeAll(() => {
    mount = createMount();
    mockSetterCompleted = jest.fn((_taskId: string, _x: boolean) => {
      mockCompleted = !mockCompleted;
    });
    mockDeleter = jest.fn((_taskId: string) => {});
  });

  beforeEach(() => {
    mockCompleted = false;
  });

  it("creates a task item with the title", () => {
    const title = "A Task Item with a title";

    const wrapper = mount(
      <TaskItem
        taskId="21529dfb-6fde-4de3-b416-b96cb91039ca"
        content={{ title: title, completed: mockCompleted }}
        setCompleted={mockSetterCompleted}
        deleter={mockDeleter}
      />
    );
    expect(wrapper).toIncludeText(title);
  });

  it("creates a task item with title and details", () => {
    const title = "A Task Item with a title";
    const description =
      "This is a long description of what needs to be in the file to show that it is working";

    const wrapper = mount(
      <TaskItem
        taskId="7a635e4e-d2ee-4b3e-a221-42f18d30d2bd"
        content={{
          title: title,
          completed: mockCompleted,
          details: description,
        }}
        setCompleted={mockSetterCompleted}
        deleter={mockDeleter}
      />
    );
    expect(wrapper).toIncludeText(title);

    wrapper.find(ExpandMoreIcon).simulate("click");
    expect(wrapper).toIncludeText(description);
  });
});
