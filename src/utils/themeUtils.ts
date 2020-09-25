/* themeUtils.ts -- using localStorage to save theme preferences
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

export function getSessionTheme(): "dark" | "light" {
  const myPref = localStorage.getItem("orenoTodoTheme");
  if (!(myPref === "dark" || myPref === "light")) {
    localStorage.setItem("orenoTodoTheme", "light");
  }
  return myPref === "dark" || myPref === "light" ? myPref : "dark";
}

export function setSessionTheme(mode: string) {
  localStorage.setItem("orenoTodoTheme", mode);
}
