/* SignUpPage.tsx -- sign-up page
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

/* Page template from:
   https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up

   Written by Rishvic Pushpakaran. */

import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import deepPurple from "@material-ui/core/colors/deepPurple";
import deepOrange from "@material-ui/core/colors/deepOrange";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link as RouterLink, useHistory } from "react-router-dom";

import FooterCopyright from "./components/FooterCopyright";
import SignUpForm from "./schemas/SignUpForm";
import loginUser from "./services/loginUser";
import signUpUser from "./services/signUpUser";
import { getSessionTheme } from "./utils/themeUtils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();

  const themePref = getSessionTheme();
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themePref,
          primary: themePref === "light" ? deepOrange : deepPurple,
        },
      }),
    [themePref]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </div>
        <Formik
          initialValues={{
            email: "",
            username: "",
            firstName: "",
            lastName: "",
            password: "",
          }}
          validationSchema={SignUpForm}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            signUpUser(values)
              .then(() => {
                loginUser({
                  username: values.username,
                  password: values.password,
                })
                  .then(() => {
                    setSubmitting(false);
                    history.push("/todo");
                  })
                  .catch((err) => {
                    console.error("Couldn't login after signup:", err);
                    setSubmitting(false);
                  });
              })
              .catch((err) => {
                console.error("Couldn't signup:", err);
                setSubmitting(false);
              });
          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field id="firstName" name="firstName">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      autoComplete="given-name"
                      variant="outlined"
                      fullWidth
                      label="First Name"
                      autoFocus
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field id="lastName" name="lastName">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      autoComplete="family-name"
                      variant="outlined"
                      fullWidth
                      label="Last Name"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field id="email" name="email" type="email">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      autoComplete="email"
                      variant="outlined"
                      required
                      fullWidth
                      label="Email Address"
                      type="email"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field id="username" name="username">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      autoComplete="username"
                      variant="outlined"
                      required
                      fullWidth
                      label="Username"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field id="password" name="password" type="password">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      autoComplete="new-password"
                      variant="outlined"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <Box mt={5}>
          <FooterCopyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpPage;
