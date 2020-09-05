/* TaskItem.tsx -- component for showing ToDo tasks
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

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionActions from "@material-ui/core/AccordionActions";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TimerIcon from "@material-ui/icons/Timer";

const useStyles = makeStyles({
  root: { width: "100%" },
});

type TaskItemProps = {
  title: string;
  details?: string;
  deadline?: Date;
};

function dateToString(date: Date): string {
  return date.toDateString();
}

function TaskItem(props: TaskItemProps) {
  const { title, details, deadline } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="task-detail-btn" />}
          aria-label="Expand"
          aria-controls="task-item-content"
          id="task-item-header"
        >
          <Box flexGrow={1}>
            <Typography component="h6" display="inline">
              {title}
            </Typography>
          </Box>
          {deadline && (
            <Box>
              <Chip
                variant="outlined"
                color="primary"
                size="small"
                icon={<TimerIcon />}
                label={dateToString(deadline)}
              />
            </Box>
          )}
        </AccordionSummary>
        {details && (
          <AccordionDetails>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              paragraph
            >
              {details}
            </Typography>
          </AccordionDetails>
        )}
        <Divider />
        <AccordionActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disableElevation
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="default"
            size="small"
            disableElevation
          >
            Edit
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default TaskItem;
