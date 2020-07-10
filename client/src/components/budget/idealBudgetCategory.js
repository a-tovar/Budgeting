import React, { useState } from "react";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";

function IdealBudgetCategory(props) {
  const categories = ["Bills", "Food", "Transportation", "Home", "Shopping"];

  const [values, updateValues] = useState({
    category: "",
    amount: 0,
  });

  const handleChange = (prop) => (e) => {
    if (!e.target.value || (prop === "amount" && e.target.value < 0)) {
      e.target.value = 0;
      // TODO: remove possibility of leading zeros
    }
    const newValues = { ...values, [prop]: e.target.value };
    updateValues(newValues);
    let index = e.target.name;
    props.valueCallback(index, newValues);
  };

  return (
    <>
      <InputLabel id="category">Category</InputLabel>
      <Select
        labelId="category"
        onChange={handleChange("category")}
        value={values.category}
        name={props.num}
      >
        {categories.map((category) => (
          <MenuItem value={category} key={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Amount"
        type="number"
        value={values.amount}
        name={props.num}
        onChange={handleChange("amount")}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      ></TextField>
    </>
  );
}

export default IdealBudgetCategory;
