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
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
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
        color="inherit"
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

  it("does not have MenuIcon when no menuTrigger is passed", () => {
    const wrapper = shallow(<TopBar />);
    expect(wrapper).not.toContainReact(<MenuIcon />);
  });

  it("contains a MenuIcon when menuTrigger is passed, which on clicking, triggers passed function", () => {
    const mockTrigger = jest.fn(() => {});

    const wrapper = shallow(<TopBar menuTrigger={mockTrigger} />);
    expect(wrapper).toContainReact(<MenuIcon />);

    wrapper.find(IconButton).forEach((iconButton) => {
      if (iconButton.containsMatchingElement(<MenuIcon />)) {
        iconButton.simulate("click");
      }
    });
    expect(mockTrigger.mock.calls.length).toBe(1);

    wrapper.find(IconButton).forEach((iconButton) => {
      if (iconButton.containsMatchingElement(<MenuIcon />)) {
        iconButton.simulate("click");
      }
    });
    expect(mockTrigger.mock.calls.length).toBe(2);
  });

  it("sets the class of app bar with the passed class", () => {
    const appClassName = "TestClassVeryLongSoThatNoOneGuessesIt";
    const wrapper = shallow(<TopBar classes={{ appBar: appClassName }} />);

    expect(wrapper.find(AppBar)).toHaveClassName(appClassName);
  });

  it("sets the class of menu button with the required class name", () => {
    const btnClassName = "ThisIsAlsoVeryLongSoThatNoOneByChanceGetsThisToo";
    const wrapper = shallow(<TopBar classes={{ menuButton: btnClassName }} />);

    wrapper.find(IconButton).forEach((iconButton) => {
      if (iconButton.containsMatchingElement(<MenuIcon />)) {
        expect(iconButton).toHaveClassName(btnClassName);
      }
    });
  });
});
