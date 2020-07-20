import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Button,
} from "@material-ui/core";

const styles = theme => {
  return {
    form: {
      display: "flex",
      padding: theme.spacing(2),
      // margin: theme.spacing(2),
      // marginTop: theme.spacing(3),
      justifyContent: 'space-between'
    },
    formControl: {
      display: 'flex',
      maxWidth: 400,
      minWidth: 150
    }
  }
};

class IdealBudgetCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      id: this.props.id,
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ category: nextProps.category });  
  }

  categories = ["Bills", "Food", "Transportation", "Home", "Shopping"];

  handleChange = (prop) => (e) => {
    if (!e.target.value || (prop === "amount" && e.target.value < 0)) {
      e.target.value = 0;
      // TODO: remove possibility of leading zeros
    }
    const newValues = { ...this.state.category, [prop]: e.target.value };
    this.setState(state => ({
      category: newValues
    }));
    this.props.valueCallback(newValues);
  };

  delCategory = () => {
    let id = this.props.num;
    this.props.delCategory(id);
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.form}>
        <FormControl className={classes.formControl}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            onChange={this.handleChange("category")}
            value={this.state.category.category}
          >
            {this.categories.map((category) => (
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
            value={this.state.category.amount}
            onChange={this.handleChange("amount")}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          ></TextField>
          <Button onClick={this.delCategory}>remove</Button>
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles, {name: 'IdealBudgetCategory'})(IdealBudgetCategory);
