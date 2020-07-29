import React, { Component } from "react";
import { connect } from "react-redux";
import compose from 'recompose/compose';
import {v4 as uuid} from 'uuid';

import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Box
} from "@material-ui/core";
import { MoreVert, Add, TripOrigin } from "@material-ui/icons";
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
      marginBottom: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      maxWidth: 800,
    },
    chart: {
      margin: "auto",
    },
    addButton: {
      marginTop: theme.spacing(-1),
      float: 'right',
      marginRight: theme.spacing(10),
      backgroundColor: theme.palette.primary.main,
      boxShadow: '2'
    },
    flexContainer: {
      maxWidth: 300,
      padding: theme.spacing(0.5),
      display: 'flex',
      justifyContent: 'space-between',
    },
    hidden: {
      display: 'none',
    },
    vertAlign: {
      marginTop: 'auto',
      marginBottom: 'auto',
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
        color: '',
      }],
      total: 0,
      anchorEl: 0,
    }
  };

  valueCallback = (data) => {
    let updatedCategories = [...this.state.categories];
    let updateIndex = updatedCategories.findIndex(cat => cat.id === data.id);
    updatedCategories[updateIndex] = data;
    this.setState({categories: updatedCategories});
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
        amount: 0,
        color: '',
      }]
    }))
  };

  delCategory = (id) => {
    this.setState(state => ({
      categories: state.categories.filter(cat => cat.id !== id)
    }));
    this.calcTotal(this.state.categories.filter(cat => cat.id !== id));
  }

  colors = ["79C7E3", "12939A", "1A3177", "FF9833", "EF5D28"];
  valuesToRadial = () => {
    let radialData = [];
    this.state.categories.forEach((category, index) => {
      let data = {
        angle: parseFloat(category.amount),
        // label: category.category,
        color: this.colors[index],
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
                    colorType="literal"
                    // showLabels={true}
                    // labelsRadiusMultiplier={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={clsx(this.state.total ? null : classes.hidden)}>
                  {this.state.categories.map((category, index) => (
                      <div className={clsx(category.amount ? classes.flexContainer : classes.hidden)} key={category.id}>
                        <div className={classes.flexContainer}>
                          <TripOrigin style={{color: this.colors[index], marginRight: '5px'}}/>
                          <Typography>{category.category}:</Typography>
                        </div>
                        <Typography className={classes.vertAlign}>{(category.amount / this.state.total * 100).toFixed(1)}%</Typography>
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
