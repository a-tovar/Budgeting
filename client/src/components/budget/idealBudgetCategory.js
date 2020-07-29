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
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

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
      maxWidth: 400,
      minWidth: 150
    },
    inline: {
      display: 'inline-block',
    },
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

  // TODO: figure out how to do this properly
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ category: nextProps.category });  
  }

  categories = ["Bills", "Food", "Transportation", "Home", "Shopping"];

  handleChange = (prop) => (e) => {
    if (!e.target.value || (prop === "amount" && e.target.value < 0)) {
      e.target.value = 0;
    }
    // remove possibility of leading zeros
    if (prop === 'amount') {
      e.target.value = +e.target.value;
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
        <div className={classes.inline}>
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
          </FormControl>
          <IconButton onClick={this.delCategory}>
            <Close/>
          </IconButton>
        </div>
      </div>
    );
  }
}


export default withStyles(styles, {name: 'IdealBudgetCategory'})(IdealBudgetCategory);
