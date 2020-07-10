import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import clsx from "clsx";
import { RadialChart, Treemap } from "react-vis";
import IdealBudgetCategory from "./idealBudgetCategory";
import { menuDrawerWidth } from "../../constants/styleConstants";
import D3FlareData from "./d3-flare-example.json";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
  },
  rootMenuOpen: {
    display: "block",
    marginLeft: menuDrawerWidth,
  },
  card: {
    margin: theme.spacing(2),
  },
  chart: {
    margin: "auto",
  },
  form: {
    display: "flex",
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
    minWidth: 150,
  },
  button: {
    margin: theme.spacing(2),
  },
}));

function IdealBudget(props) {
  const classes = useStyles();
  const [values, updateValues] = useState([]);
  const [total, updateTotal] = useState(0);
  const [numCategories, updateNumCategories] = useState(1);

  const valueCallback = (index, data) => {
    let newValues = [...values];
    newValues[index] = data;
    updateValues((values) => newValues);
    calcTotal(values);
  };

  const calcTotal = (newValues) => {
    let total = 0;
    newValues.forEach((category) => {
      total += parseFloat(category.amount);
    });
    // for (const key in newValues) {
    //   if (key === "value") total += parseFloat(newValues[key]);
    // }
    updateTotal(total);
  };

  const addCategory = () => {
    updateNumCategories(numCategories + 1);
  };

  const valuesToRadial = () => {
    let radialData = [];
    values.forEach((category) => {
      let data = {
        angle: parseFloat(category.amount),
        label: category.category, // TODO: put labels in legend next to chart
      };
      if (category.amount) radialData.push(data);
    });
    return radialData;
  };

  const chartOptions = ["Radial Chart", "Treemap", "Sunburst"];
  const [anchorEl, setAnchorEl] = useState(null);
  const chartOptionsOpen = Boolean(anchorEl);
  const openChartOptions = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const closeChartOptions = (e) => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className={clsx(props.menuOpen ? classes.rootMenuOpen : classes.root)}
      >
        {/* <div>{total}</div>
        <div>{JSON.stringify(values)}</div> */}
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton
                aria-label="chart-options"
                aria-controls="chart-options-menu"
                aria-haspopup="true"
                onClick={openChartOptions}
              >
                <MoreVert />
              </IconButton>
            }
            title="Ideal Monthly Budget"
          />
          <Menu
            id="chart-options-menu"
            anchorEl={anchorEl}
            keepMounted
            open={chartOptionsOpen}
            onClose={closeChartOptions}
          >
            {chartOptions.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Radial Chart"}
                onClick={closeChartOptions}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <CardContent>
            <RadialChart
              className={classes.chart}
              data={valuesToRadial()}
              width={300}
              height={300}
              innerRadius={100}
              radius={70}
              showLabels={true}
              labelsRadiusMultiplier={2}
            />
            {/* <Treemap
              {...{
                animation: true,
                colorType: "literal",
                data: D3FlareData,
                mode: "circlePack",
                height: 300,
                width: 300,
                renderMode: "DOM",
              }}
            /> */}
          </CardContent>
        </Card>
        {Array.from(Array(numCategories)).map((x, index) => (
          <FormControl className={classes.form} key={index.toString()}>
            <IdealBudgetCategory
              key={index.toString()}
              num={index.toString()}
              valueCallback={valueCallback}
            ></IdealBudgetCategory>
          </FormControl>
        ))}
        <Button
          onClick={addCategory}
          variant="outlined"
          className={classes.button}
        >
          Add Category
        </Button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    menuOpen: state.pageState.menuOpen,
    darkMode: state.pageState.darkMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IdealBudget);
