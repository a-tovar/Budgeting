import React, { Component } from "react";
import { connect } from "react-redux";
import compose from 'recompose/compose'
import {v4 as uuid} from 'uuid';

import { withStyles } from "@material-ui/core/styles";
import {
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
import { MoreVert, AddCircle } from "@material-ui/icons";
import clsx from "clsx";
import { RadialChart, Treemap } from "react-vis";
import IdealBudgetCategory from "./idealBudgetCategory";
import { menuDrawerWidth } from "../../constants/styleConstants";

const styles = (theme) => {
  return {
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
      backgroundColor: theme.palette.secondary.main,
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
  }
};

class IdealBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{
        id: uuid(),
        category: '',
        amount: 0,
      }],
      total: 0,
      anchorEl: 0,
    }
  };

  valueCallback = (data) => {
    let updatedCategories = [...this.state.categories];
    let updateIndex = updatedCategories.findIndex(cat => cat.id === data.id);
    updatedCategories[updateIndex] = data;
    this.setState(state => ({
      categories: updatedCategories
    }))
    this.calcTotal(updatedCategories);
  };

  calcTotal = (categories) => {
    let total = 0;
    categories.forEach((category) => {
      total += parseFloat(category.amount);
    });
    this.setState({ 'total': total} );
  };

  addCategory = () => {
    this.setState(state => ({
      categories: [...state.categories, {
        id: uuid(),
        category: '',
        amount: 0
      }]
    }))
  };

  delCategory = (id) => {
    this.setState(state => ({
      categories: state.categories.filter(cat => cat.id !== id)
    }));
    this.calcTotal(this.state.categories.filter(cat => cat.id !== id));
  }

  valuesToRadial = () => {
    let radialData = [];
    this.state.categories.forEach((category) => {
      let data = {
        angle: parseFloat(category.amount),
        label: category.category, // TODO: put labels in legend next to chart
        // color: '#f111b2'
      };
      if (category.amount) radialData.push(data);
    });
    return radialData;
  };

  chartOptions = ["Radial Chart", "Treemap", "Sunburst"];
  chartOptionsOpen = () => {
    return Boolean(this.state.anchorEl);
  }
  openChartOptions = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  closeChartOptions = (e) => {
    this.setState({ anchorEl: null })
  };

  render() {
    const {classes} = this.props;

    return (
      <>
        <div
          className={clsx(this.props.menuOpen ? classes.rootMenuOpen : classes.root)}
        >
          <Card className={classes.card}>
            <CardHeader
              action={
                <IconButton
                  aria-label="chart-options"
                  aria-controls="chart-options-menu"
                  aria-haspopup="true"
                  onClick={this.openChartOptions}
                >
                  <MoreVert />
                </IconButton>
              }
              title="Ideal Monthly Budget"
            />
            <Menu
              id="chart-options-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={this.chartOptionsOpen()}
              onClose={this.closeChartOptions}
            >
              {this.chartOptions.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Radial Chart"}
                  onClick={this.closeChartOptions}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <CardContent>
              {/* <div>{JSON.stringify(this.state.categories)}</div> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RadialChart
                    className={classes.chart}
                    data={this.valuesToRadial()}
                    width={300}
                    height={300}
                    innerRadius={100}
                    radius={70}
                    showLabels={true}
                    labelsRadiusMultiplier={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={clsx(this.state.total ? null : classes.hidden)}>
                  {this.state.categories.map(category => (
                      <div className={classes.flexContainer} key={category.id}>
                        <Typography>{category.category}:</Typography>
                        <Typography>{(category.amount / this.state.total * 100).toFixed(1)}%</Typography>
                      </div>
                    ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Paper className={classes.paper}>
            {this.state.categories.map((category, index) => (
              <IdealBudgetCategory
              key={index.toString()}
              num={category.id}
              category={category}
              valueCallback={this.valueCallback}
              delCategory={this.delCategory}
              />
            ))}
          </Paper>
          <IconButton
            onClick={this.addCategory}
            color='primary'
            className={classes.button}
          >
            <AddCircle />
          </IconButton>
        </div>
      </>
    )
  }
}

// IdealBudget.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => {
  return {
    menuOpen: state.pageState.menuOpen,
    darkMode: state.pageState.darkMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  withStyles(styles, {name: 'IdealBudget'}),
  connect(mapStateToProps, mapDispatchToProps)
)(IdealBudget);
