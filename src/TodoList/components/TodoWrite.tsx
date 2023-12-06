import { Add } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface TodoWriteProps {
  onRefresh: () => void;
}

const TodoWrite = (props: TodoWriteProps) => {
  // state
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addValue, setAddValue] = useState<string>("");

  const handleSubmit = async () => {
    const newItem = {
      checked: false,
      name: addValue,
    }

    try {
      const response = await fetch('http://localhost:4000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add TodoItem');
      }

      console.log('TodoItem added successfully');
      // Perform any additional actions after successful POST if needed

      setAddValue("");
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding TodoItem:', error);
    }
  };

  return (
    <>
      {!isAdding ? (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAdding(true)}
        >
          Add
        </Button>
      ) : (
        <Stack spacing={1}>
          <TextField
            size="small"
            placeholder="Type new todo..."
            value={addValue}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setAddValue(e.target.value)}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button variant="outlined" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default TodoWrite;
