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
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import TaskItem from "./components/TaskItem";
import TopBar from "./components/TopBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Rishvic Pushpakaran 2020."}
      <br />
      {"Icons made by "}
      <Link color="inherit" href="https://www.flaticon.com/authors/freepik">
        Freepik
      </Link>
      {" from "}
      <Link color="inherit" href="https://www.flaticon.com/">
        www.flaticon.com
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(1, 1),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function App() {
  const classes = useStyles();

  const details =
    "This is a description for the thing i am creating for the " +
    "sample task item in the page for now";

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <main className={classes.main}>
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
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default App;
