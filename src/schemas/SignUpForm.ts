/* SignUpForm.ts -- schema for sign up form
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

import { object as yupObject, string as yupString } from "yup";

const SignUpForm = yupObject().shape({
  email: yupString().required().email(),
  username: yupString()
    .required()
    .min(3)
    .max(20)
    .matches(/^[\w.@+-]+$/),
  firstName: yupString().notRequired().max(25),
  lastName: yupString().notRequired().max(25),
  password: yupString().required().min(9).max(35),
});

export default SignUpForm;
