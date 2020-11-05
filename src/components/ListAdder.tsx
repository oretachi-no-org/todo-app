/* ListAdder.tsx -- component to add new list
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
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { ListApiModel, ListContentModel } from "../models/ListModel";
import ListForm from "../schemas/ListForm";
import createList from "../services/createList";

type Props = {
  adder: (list: ListApiModel) => void;
};

export default function ListAdder(props: Props) {
  const { adder } = props;
  const initialValues: ListContentModel = { name: "" };

  return (
    <ListItem>
      <Formik
        initialValues={initialValues}
        validationSchema={ListForm}
        onSubmit={(values, { setFieldValue, setSubmitting }) => {
          createList(values)
            .then((res) => {
              adder(res);
              setFieldValue("name", "", false);
              setSubmitting(false);
            })
            .catch((err) => {
              console.error("Couldn't add list item:", err);
              setSubmitting(false);
            });
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <Field id="name" name="name">
            {({ field, meta }: FieldProps) => (
              <TextField
                placeholder="Add list..."
                fullWidth
                error={Boolean(meta.error) && meta.touched}
                helperText={meta.error}
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PlaylistAddIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          </Field>
        </Form>
      </Formik>
    </ListItem>
  );
}
