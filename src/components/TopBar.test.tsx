/* TopBar.test.tsx -- testing top bar for the app
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
import { createShallow } from "@material-ui/core/test-utils";
import TopBar from "./TopBar";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import TodoIcon from "./TodoIcon";

describe("<TopBar />", () => {
  let shallow: typeof import("enzyme").shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("contains the main title and logo", () => {
    const wrapper = shallow(<TopBar />);
    expect(wrapper).toIncludeText("ToDo App");
    expect(wrapper).toContainReact(<TodoIcon />);
  });

  it("contains a GitHub icon with link to source", () => {
    const wrapper = shallow(<TopBar />);
    const buttonToFind = (
      <IconButton
        color="default"
        aria-label="source code"
        href="https://github.com/oretachi-no-org/todo-app"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon />
      </IconButton>
    );
    expect(wrapper).toContainReact(buttonToFind);
  });
});
