/* getLists.ts -- get all the task lists associated with the user
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

/* Written by Rishvic Pushpakaran */

//import axios from "axios";
import ListApiModel from "../models/ListApiModel";

function getLists(): Promise<ListApiModel[]> {
  return new Promise((resolve, _reject) => {
    //    axios
    //      .get<ListApiModel[]>("/list")
    //      .then((res) => {
    //        resolve(res.data);
    //      })
    //      .catch((res) => {
    //        console.log(res);
    //        _reject(res);
    //      });
    resolve([
      { id: "857ed483-ef6b-4cfd-86b2-53e852debc15", name: "List Numero Uno" },
      { id: "5934e912-4650-476a-8c9a-1b4dd2cb0119", name: "Dos, Tres.." },
      { id: "1e3c7694-c1ae-41ea-9c48-d6278158950a", name: "Swimming" },
    ]);
  });
}

export default getLists;
