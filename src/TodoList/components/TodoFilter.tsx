import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { FilterInterface, FilterMode } from "../types";

interface FilterProps {
  value: FilterInterface;
  onChange: (nVal: any, field: "mode" | "keyword") => void;
}

const Filter = (props: FilterProps) => {
  const { value, onChange } = props;
  return (
    <>
      <TextField
        value={value.keyword}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange(e.target.value, "keyword")}
        size="small"
        placeholder="Type to search..."
      />

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={value.mode}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            value: string
          ) => onChange(value, "mode")}
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value={FilterMode.All}
            control={<Radio />}
            label="All"
          />
          <FormControlLabel
            value={FilterMode.Done}
            control={<Radio />}
            label="Done"
          />
          <FormControlLabel
            value={FilterMode.NotDone}
            control={<Radio />}
            label="Not Done"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Filter;
