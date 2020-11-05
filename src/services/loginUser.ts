/* loginUser.ts -- service to log-in a user
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

import axiosInstance from "./axiosInstance";

import { AuthToken, AuthResponseToken } from "../models/AuthModels";
import { isAuthenticated, setAuthToken } from "../utils/authUtils";

export default function loginUser(creds: AuthToken): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (isAuthenticated()) {
      reject(new Error("Another user is already logged in"));
    } else {
      axiosInstance()
        .post<AuthResponseToken>("/user/login/", { ...creds })
        .then((res) => {
          setAuthToken(res.data.token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
