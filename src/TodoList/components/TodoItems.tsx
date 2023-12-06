import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { TodoItem } from "../types";
import { updateTodoList } from "../utils";

interface TodoItemsProps {
  items: TodoItem[];
  onRefresh: () => void;
}

const TodoItems = (props: TodoItemsProps) => {
  const { items, onRefresh } = props;

  const handleCheck = async (item: TodoItem, isChecked: boolean) => {
    try {
      item.checked = isChecked;
      updateTodoList(item);
      onRefresh();
    } catch (error) {
      console.error('Error handling check:', error);
    }
  };

  return (
    <FormGroup>
      {items?.map((_item: TodoItem, i: number) => (
        <FormControlLabel
          key={_item?.id}
          control={
            <Checkbox
              checked={_item.checked}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => handleCheck(_item, checked)}
            />
          }
          label={_item.name}
        />
      ))}
    </FormGroup>
  );
};

export default TodoItems;
