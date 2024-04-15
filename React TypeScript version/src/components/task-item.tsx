import React, { useState } from 'react';
import { ListItem, Typography, Stack, Checkbox, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { helperText } from './add-task-field';
import { flexWidth, buttonStyle } from '../app/styles';

interface TaskProps {
  text: string;
  checked: boolean;
  error: boolean;
  onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function TaskItem({ text, checked, error, onChecked, onDelete, onChange }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);

  let content;

  content = isEditing ? (
    <Stack component={'form'} direction="row" position="relative">
      <TextField
        autoFocus
        value={text}
        onChange={onChange}
        label={error ? helperText : 'Имя задачи'}
        variant="standard"
        sx={flexWidth}
      />
      <Button
        type="submit"
        disabled={error}
        onClick={() => {
          setIsEditing(false);
        }}
        sx={buttonStyle}
      >
        <CheckIcon />
      </Button>
    </Stack>
  ) : (
    <>
      <Checkbox checked={checked} onChange={onChecked} />
      <Typography textAlign={'center'}>{text}</Typography>
    </>
  );

  return (
    <ListItem
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{
        ...flexWidth,
        paddingLeft: 0,
        display: 'flex',
      }}
    >
      {content}
      {!isEditing && isHover ? (
        <Stack direction={'row'}>
          <Button
            disabled={checked}
            onClick={() => setIsEditing(true)}
            sx={{ ...buttonStyle, bottom: '10px', right: '27px' }}
          >
            <EditIcon />
          </Button>
          <Button onClick={onDelete} sx={{ ...buttonStyle, bottom: '10px' }}>
            <DeleteIcon sx={{ color: 'coral' }} />
          </Button>
        </Stack>
      ) : null}
    </ListItem>
  );
}
