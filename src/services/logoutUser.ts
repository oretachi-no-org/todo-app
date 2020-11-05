/* logoutUser.ts -- service to log-out user
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

import { clearAuthToken } from "../utils/authUtils";

export default function logoutUser(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    axiosInstance()
      .delete("/user/logout/")
      .then(() => {
        clearAuthToken();
        resolve();
      })
      .catch((err) => {
        console.error("Error DELETE failed:", err);
        reject(err);
      });
  });
}
