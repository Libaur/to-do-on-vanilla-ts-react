import React, { useState, useEffect } from "react";
import { Stack, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatchContext, useStateContext } from "../app/context";
import { generateCode } from "../app/utils";
import { isPatternPassed } from "../app/utils";
import { flexWidth, buttonStyle } from "../app/styles";

export const helperText = "Пожалуйста, придумайте описание задачи";

export function AddTaskField() {
  const [text, setText] = useState("");
  const [error, setError] = useState(true);

  const dispatch = useDispatchContext();
  if (!dispatch) console.error("dispath is null from AddTaskField");
  const tasks = useStateContext();

  useEffect(() => {
    if (tasks?.length)
      localStorage.setItem("storedTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    isPatternPassed(text) ? setError(false) : setError(true);
    setText(text);
  };

  const handleAddTask = () => {
    dispatch?.({
      type: "add",
      id: generateCode(),
      text: text,
      checked: false,
    });
    setText("");
    setError(true);
  };

  return (
    <Stack component={"form"} direction="row" position="relative">
      <TextField
        value={text}
        onChange={(e) => handleChange(e)}
        label={error ? helperText : "Имя новой задачи"}
        variant="standard"
        sx={flexWidth}
      />
      <Button
        type="submit"
        onClick={() => handleAddTask()}
        sx={buttonStyle}
        disabled={error}
      >
        <AddIcon />
      </Button>
    </Stack>
  );
}
