/* TodoPage.tsx -- main app
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

import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Switch, Route, RouteComponentProps } from "react-router-dom";

import FooterCopyright from "./components/FooterCopyright";
import TaskMapper from "./components/TaskMapper";
import ListMapper from "./components/ListMapper";
import TopBar from "./components/TopBar";
import { getSessionTheme, setSessionTheme } from "./utils/themeUtils";

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
    },
    main: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarPopup: {
      zIndex: theme.zIndex.drawer + 2,
    },
    appBarLight: {
      background: "linear-gradient(60deg, #FF6363 30%, #FFBD69 90%)",
    },
    appBarDark: {
      background: "linear-gradient(300deg, #202040 30%, #543864 90%)",
    },
    menuButton: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    footer: {
      padding: theme.spacing(1, 1),
    },
    footerLight: {
      backgroundColor: theme.palette.grey[200],
    },
    footerDark: {
      backgroundColor: theme.palette.grey[800],
    },
  })
);

type DrawerContentProps = {
  closeDrawer?: () => void;
};

function TodoPage() {
  const [darkMode, setDarkMode] = React.useState(getSessionTheme() === "dark");
  const handleDarkMode = () => {
    sessionStorage.setItem("darkModePref", darkMode ? "light" : "dark");
    setSessionTheme(darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  const appTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerContent = ({ closeDrawer }: DrawerContentProps) => (
    <Switch>
      <Route
        path="/todo/:listId?"
        exact
        render={(
          props: RouteComponentProps<{ listId: string | undefined }>
        ) => {
          return (
            <ListMapper
              listId={props.match.params.listId}
              closeDrawer={closeDrawer}
            />
          );
        }}
      />
    </Switch>
  );

  return (
    <div className={classes.root}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <TopBar
          menuTrigger={handleDrawerToggle}
          themeTrigger={handleDarkMode}
          classes={{
            appBar: `${classes.appBar} ${
              darkMode ? classes.appBarDark : classes.appBarLight
            }`,
            menuButton: classes.menuButton,
            popup: classes.appBarPopup,
          }}
        />
        <nav className={classes.drawer} aria-label="task lists">
          <Hidden smUp implementation="js">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <DrawerContent closeDrawer={handleDrawerToggle} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="js">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <div className={classes.toolbar} />
              <Divider />
              <DrawerContent />
            </Drawer>
          </Hidden>
        </nav>
        <Grid container direction="column">
          <Grid item component="main" className={classes.main}>
            <div className={classes.toolbar} />
            <Switch>
              <Route
                path="/todo/:listId"
                render={({ match }: any) => (
                  <TaskMapper listId={match.params["listId"]} />
                )}
              />
            </Switch>
          </Grid>
          <Grid
            item
            component="footer"
            className={`${classes.footer} ${
              darkMode ? classes.footerDark : classes.footerLight
            }`}
          >
            <FooterCopyright />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default TodoPage;
