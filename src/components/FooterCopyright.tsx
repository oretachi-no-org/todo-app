/* FooterCopyright -- footer with copyright section
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
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

function FooterCopyright() {
  return (
    <Container maxWidth="sm">
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright © Rishvic Pushpakaran 2020.
        <br />
        {"Icons made by "}
        <Link
          color="inherit"
          href="https://www.flaticon.com/authors/freepik"
          target="_blank"
          rel="noopener"
        >
          Freepik
        </Link>
        {" from "}
        <Link
          color="inherit"
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noopener"
        >
          www.flaticon.com
        </Link>
      </Typography>
    </Container>
  );
}

export default FooterCopyright;
