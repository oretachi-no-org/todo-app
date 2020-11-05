/* AnonRoute.tsx -- redirects to todo page if already authenticated
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

/* Written by Rishvic Pushpakaran.
   Code derived from https://reactrouter.com/web/example/auth-workflow */

import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { isAuthenticated } from "../utils/authUtils";

type Props = RouteProps & { children: ReactNode };

export default function AnonRoute(props: Props) {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => (
        <>
          {isAuthenticated() ? (
            <Redirect to={{ pathname: "/todo" }} />
          ) : (
            children
          )}
        </>
      )}
    />
  );
}
