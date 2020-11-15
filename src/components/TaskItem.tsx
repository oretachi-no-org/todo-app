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
import CloseIcon from "@material-ui/icons/Close";

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionActions from "@material-ui/core/AccordionActions";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TimerIcon from "@material-ui/icons/Timer";

import { TaskModel } from "../models/TaskModel";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

function dateToString(date: Date): string {
  return date.toDateString();
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deadlineLight: {
      color: theme.palette.warning.dark,
    },
    deadlineDark: {
      color: theme.palette.warning.light,
    },
  })
);

type SetterProps = {
  setCompleted: (taskId: string, x: boolean) => void;
  deleter: (taskId: string) => void;
};

type Props = TaskModel & SetterProps;

function TaskItem(props: Props) {
  const { taskId, content, setCompleted, deleter } = props;
  const { title, completed, details, deadline } = content;
  const classes = useStyles();
  const theme = useTheme();

  const [openDelete, setOpenDelete] = React.useState<boolean>(false);

  const handleDelete = () => {
    setOpenDelete(true);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openDelete}
        autoHideDuration={6000}
        message="Task deleted"
        onClose={() => {
          setOpenDelete(false);
          deleter(taskId);
        }}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={() => setOpenDelete(false)}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setOpenDelete(false);
                deleter(taskId);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {!openDelete && (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon id="task-detail-btn" />}
            aria-label="Expand"
            aria-controls="task-item-content"
            id="task-item-header"
          >
            <Box flexGrow={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={completed}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    onChange={(event) => {
                      setCompleted(taskId, event.target.checked);
                    }}
                  />
                }
                label={
                  <Typography
                    color={completed ? "textSecondary" : "textPrimary"}
                    component="h6"
                    display="inline"
                  >
                    {completed ? <del>{title}</del> : title}
                  </Typography>
                }
              />
            </Box>
            {deadline && (
              <Box>
                <Chip
                  variant="outlined"
                  size="small"
                  icon={
                    <TimerIcon
                      className={
                        theme.palette.type === "light"
                          ? classes.deadlineLight
                          : classes.deadlineDark
                      }
                    />
                  }
                  label={dateToString(deadline)}
                  className={
                    theme.palette.type === "light"
                      ? classes.deadlineLight
                      : classes.deadlineDark
                  }
                />
              </Box>
            )}
          </AccordionSummary>
          {details && (
            <AccordionDetails>
              <Typography variant="body2" color="textSecondary" paragraph>
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
              onClick={handleDelete}
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
      )}
    </>
  );
}

export default TaskItem;
