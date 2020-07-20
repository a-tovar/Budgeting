import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    padding: theme.spacing(2),
    // margin: theme.spacing(2),
    // marginTop: theme.spacing(3),
    justifyContent: 'space-between'
  },
  formControl: {
    maxWidth: 400,
    minWidth: 150
  }
}));

function IdealBudgetCategory(props) {
  const classes = useStyles();
  const categories = ["Bills", "Food", "Transportation", "Home", "Shopping"];

  const [values, updateValues] = useState(props.category);

  const handleChange = (prop) => (e) => {
    if (!e.target.value || (prop === "amount" && e.target.value < 0)) {
      e.target.value = 0;
      // TODO: remove possibility of leading zeros
    }
    const newValues = { ...values, [prop]: e.target.value };
    updateValues(newValues);
    let index = props.num;
    props.valueCallback(index, newValues);
  };

  const delCategory = () => {
    let index = props.num;
    props.delCategory(index);
  }

  return (
    <div className={classes.form}>
      <FormControl className={classes.formControl}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          onChange={handleChange("category")}
          value={values.category}
        >
          {categories.map((category) => (
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Amount"
          type="number"
          value={values.amount}
          onChange={handleChange("amount")}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        ></TextField>
        <Button onClick={delCategory}>remove</Button>
      </FormControl>
    </div>
  );
}

export default IdealBudgetCategory;
