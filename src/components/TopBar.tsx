/* TopBar.tsx -- main top bar for the app
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
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import TodoIcon from "./TodoIcon";

type TopBarClasses = {
  appBar?: string;
  menuButton?: string;
};

type TopBarProps = {
  menuTrigger?: () => void;
  themeTrigger?: () => void;
  classes?: TopBarClasses;
};

function TopBar(props: TopBarProps) {
  const { menuTrigger, themeTrigger, classes } = props;
  const theme = useTheme();

  return (
    <AppBar
      color="inherit"
      position="fixed"
      className={classes ? classes.appBar : undefined}
    >
      <Toolbar>
        {menuTrigger && (
          <Box mr={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={menuTrigger}
              className={classes ? classes.menuButton : undefined}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Box mr={1}>
          <TodoIcon />
        </Box>
        <Box flexGrow={1}>
          <Typography variant="h6">ToDo App</Typography>
        </Box>
        <Box>
          <Tooltip title="GitHub Repo">
            <IconButton
              color="inherit"
              aria-label="source code"
              href="https://github.com/oretachi-no-org/todo-app"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {themeTrigger && (
          <Box ml={1}>
            <Tooltip title="Toggle theme">
              <IconButton
                color="inherit"
                aria-label="toggle theme"
                onClick={themeTrigger}
              >
                {theme.palette.type === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
