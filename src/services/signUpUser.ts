/* signUpUser.ts -- service to sign up new user
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

import axiosInstance from "./axiosInstance";
import { UserModel } from "../models/AuthModels";

export default function signUpUser(values: UserModel): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    axiosInstance()
      .post("/user/account/", values)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        if (
          err["response"] &&
          err.response.status >= 400 &&
          err.response.status < 500
        ) {
          let err_msg = "Unable to sign up with the provided credentials.";
          if (err.response.data["nonFieldErrors"])
            err_msg = err.response.data.nonFieldErrors[0];
          else if (err.response.data["email"])
            err_msg = err.response.data.email[0];
          else if (err.response.data["username"])
            err_msg = err.response.data.username[0];
          reject(new Error(err_msg));
        } else
          reject(new Error("Unable to sign up, please try again in a while."));
      });
  });
}
