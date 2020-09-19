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
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
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
    const wrapper = shallow(<TopBar menuTrigger={() => {}} />);
    expect(wrapper).toContainReact(<MenuIcon />);
  });

  it("sets the class of app bar with the passed class", () => {
    const appClassName = "b60b1ad2-cabd-426e-b68b-97ca5f84e70e";
    const wrapper = shallow(<TopBar classes={{ appBar: appClassName }} />);

    expect(wrapper.find(AppBar)).toHaveClassName(appClassName);
  });

  it("sets the class of menu button with the required class name", () => {
    const btnClassName = "fac5c0f3-1b2e-4371-a3bb-f66e2ea0b2a3";
    const wrapper = shallow(<TopBar classes={{ menuButton: btnClassName }} />);

    wrapper.find(IconButton).forEach((iconButton) => {
      if (iconButton.containsMatchingElement(<MenuIcon />)) {
        expect(iconButton).toHaveClassName(btnClassName);
      }
    });
  });

  it("does not contain theme trigger by default", () => {
    const wrapper = shallow(
      <TopBar
        classes={{ menuButton: "00a3f488-dbab-4ed2-9716-e3ba9c830c3b" }}
      />
    );
    expect(wrapper).not.toContainReact(<Brightness4Icon />);
    expect(wrapper).not.toContainReact(<Brightness7Icon />);
  });

  it("contains theme trigger if specified, and icons function properly", () => {
    let testDarkTheme = false;
    const handleTestDarkTheme = () => {
      testDarkTheme = !testDarkTheme;
    };
    const wrapper = shallow(
      <TopBar
        classes={{ menuButton: "00a3f488-dbab-4ed2-9716-e3ba9c830c3b" }}
        themeTrigger={handleTestDarkTheme}
      />
    );
    expect(wrapper).toContainReact(<Brightness4Icon />);
    expect(wrapper).not.toContainReact(<Brightness7Icon />);
  });

  it("contains theme trigger if specified, and icons function properly", () => {
    let testDarkTheme = false;
    const handleTestDarkTheme = () => {
      testDarkTheme = !testDarkTheme;
    };
    const wrapper = shallow(
      <TopBar
        classes={{ menuButton: "5760e9ef-8d8c-4a92-ac9a-a9794b759098" }}
        themeTrigger={handleTestDarkTheme}
      />
    );

    wrapper.find(IconButton).forEach((iconButton) => {
      if (
        iconButton.containsMatchingElement(<Brightness4Icon />) ||
        iconButton.containsMatchingElement(<Brightness7Icon />)
      ) {
        iconButton.simulate("click");
      }
    });
    expect(testDarkTheme).toBe(true);
  });
});
