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
  Grid,
  Paper,
  Typography
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
    padding: theme.spacing(2),
  },
  rootMenuOpen: {
    display: "block",
    marginLeft: menuDrawerWidth,
    padding: theme.spacing(2)
  },
  card: {
    // margin: theme.spacing(2),
  },
  paper: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: 800,
  },
  chart: {
    margin: "auto",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  flexContainer: {
    maxWidth: 300,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  hidden: {
    visibility: 'hidden',
  }
}));

function IdealBudget(props) {
  const classes = useStyles();
  const emptyCategory = {
    category: '',
    amount: 0,
  }
  const [values, updateValues] = useState([emptyCategory]);
  const [total, updateTotal] = useState(0);
  // const [numCategories, updateNumCategories] = useState(1);

  const valueCallback = (index, data) => {
    let newValues = [...values];
    newValues[index] = data;
    updateValues((values) => newValues);
    calcTotal(newValues);
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
    let newValues = [...values]
    newValues.push(emptyCategory);
    updateValues((values) => newValues);
    // updateNumCategories(numCategories + 1);
  };

  const delCategory = (index) => {
    let newValues = [...values];
    newValues.splice(index, 1);
    updateValues((values) => newValues);
  }

  const valuesToRadial = () => {
    let radialData = [];
    values.forEach((category) => {
      let data = {
        angle: parseFloat(category.amount),
        label: category.category, // TODO: put labels in legend next to chart
        // color: '#f111b2'
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
            <div>{JSON.stringify(values)}</div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              </Grid>
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
              <Grid item xs={12} sm={6} className={clsx(total ? null : classes.hidden)}>
                {values.map(category => (
                    <div className={classes.flexContainer}>
                      <Typography>{category.category}:</Typography>
                      <Typography>{(category.amount / total * 100).toFixed(1)}%</Typography>
                    </div>
                  ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Paper className={classes.paper}>
          {/* {Array.from(Array(numCategories)).map((x, index) => (
              <IdealBudgetCategory
                key={index.toString()}
                num={index.toString()}
                valueCallback={valueCallback}
                delCategory={delCategory}
              ></IdealBudgetCategory>
          ))} */}
          {values.map((category, index) => (
            <IdealBudgetCategory
            key={index.toString()}
            num={index.toString()}
            category={category}
            valueCallback={valueCallback}
            delCategory={delCategory}
            />
          ))}
        </Paper>
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
