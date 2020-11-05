/* createList.ts -- service to create a list
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
import { ListApiModel, ListContentModel } from "../models/ListModel";
import { AxiosResponse } from "axios";

export default function createList(
  content: ListContentModel
): Promise<ListApiModel> {
  return new Promise<ListApiModel>((resolve, reject) => {
    axiosInstance()
      .post<ListContentModel, AxiosResponse<ListApiModel>>(
        "/todo/lists/",
        content
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
