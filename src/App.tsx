/* App.tsx -- main app
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

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import TaskItem from "./components/TaskItem";
import TopBar from "./components/TopBar";

import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © Rishvic Pushpakaran 2020.
      <br />
      {"Icons made by "}
      <Link
        color="inherit"
        href="https://www.flaticon.com/authors/freepik"
        target="_blank"
        rel="noopener"
      >
        Freepik
      </Link>
      {" from "}
      <Link
        color="inherit"
        href="https://www.flaticon.com/"
        target="_blank"
        rel="noopener"
      >
        www.flaticon.com
      </Link>
    </Typography>
  );
}

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
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
    marginTop: "auto",
  },
  footerLight: {
    backgroundColor: theme.palette.grey[200],
  },
  footerDark: {
    backgroundColor: theme.palette.grey[800],
  },
}));

function App() {
  const [darkMode, setDarkMode] = React.useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );
  const handleDarkMode = () => {
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

  const details =
    "This is a description for the thing i am creating for the " +
    "sample task item in the page for now";

  const tempDrawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
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
          }}
        />
        <nav className={classes.drawer} aria-label="task lists">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {tempDrawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              {tempDrawer}
            </Drawer>
          </Hidden>
        </nav>
        <Grid container direction="column">
          <Grid item component="main" className={classes.main}>
            <div className={classes.toolbar} />
            <Container>
              <Box my={1}>
                <TaskItem
                  title="Testing how it looks"
                  details={details}
                  deadline={new Date()}
                />
              </Box>
              <Box my={1}>
                <TaskItem title="Testing how it looks pt 2" />
              </Box>
              <Box my={1}>
                <TaskItem title="Testing how it looks pt 2.2" details="syke" />
              </Box>
            </Container>
          </Grid>
          <Grid
            item
            component="footer"
            className={`${classes.footer} ${
              darkMode ? classes.footerDark : classes.footerLight
            }`}
          >
            <Container maxWidth="sm">
              <Copyright />
            </Container>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
