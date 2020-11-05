/* TaskAdder.tsx -- component to add new task to a list
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
import { Formik, Form, Field, FieldProps } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import CreateIcon from "@material-ui/icons/Create";

import { TaskContentModel, TaskModel } from "../models/TaskModel";
import TaskForm from "../schemas/TaskForm";
import createTask from "../services/createTask";

type Props = {
  listId: string;
  adder: (task: TaskModel) => void;
};

function TaskAdder(props: Props) {
  const { listId, adder } = props;
  const initialValues: TaskContentModel = { title: "", completed: false };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskForm}
      onSubmit={(values, { setFieldValue, setSubmitting }) => {
        createTask(listId, values)
          .then((res) => {
            adder(res);
            setFieldValue("title", "", false);
            setSubmitting(false);
          })
          .catch((err) => {
            console.error("Couldn't add task:", err);
            setSubmitting(false);
          });
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <Field id="title" name="title">
          {({ field, meta }: FieldProps) => (
            <TextField
              placeholder="Add a new task..."
              fullWidth
              error={Boolean(meta.error) && meta.touched}
              helperText={meta.error}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreateIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        </Field>
      </Form>
    </Formik>
  );
}

export default TaskAdder;
