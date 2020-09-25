/* App.tsx -- app component
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
import { Switch, Redirect, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import TodoPage from "./TodoPage";

function App() {
  return (
    <Switch>
      <Route path="/todo">
        <TodoPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
      <Redirect to="/todo" />
    </Switch>
  );
}

export default App;
