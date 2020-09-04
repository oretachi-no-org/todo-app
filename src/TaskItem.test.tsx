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
import { createShallow, createMount } from "@material-ui/core/test-utils";
import TaskItem from "./TaskItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

describe("<TaskItem />", () => {
  let shallow: typeof import("enzyme").shallow;
  let mount: typeof import("enzyme").mount;

  beforeAll(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it("creates a task item with the title", () => {
    const title = "A Task Item with a title";
    const wrapper = mount(<TaskItem title={title} />);
    expect(wrapper).toHaveText(title);
  });

  it("creates a task item with title and details", () => {
    const title = "A Task Item with a title";
    const description =
      "This is a long description of what needs to be in the file to show that it is working";

    const wrapper = mount(<TaskItem title={title} details={description} />);
    expect(wrapper).toIncludeText(title);

    wrapper.find(ExpandMoreIcon).simulate("click");
    expect(wrapper).toIncludeText(description);
  });

  it("throws error if you try to create a task item with empty title", () => {
    expect(() => {
      shallow(<TaskItem title="" deadline={new Date()} />);
    }).toThrowError(new Error("tasks items can't have empty titles"));
  });
});
