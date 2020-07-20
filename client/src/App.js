import React from "react";
import { connect } from "react-redux";

import Nav from "./components/navbar/nav";
import IdealBudget from "./components/budget/idealBudget";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import "./App.css";

function App(props) {
  const theme = createMuiTheme({
    palette: {
      type: props.darkMode ? "dark" : "light",
      primary: {
        main: "#99f2d4",
        dark: "#2f4454",
      },
      secondary: {
        main: "#b39ddb",
        dark: "#5e35b1",
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Nav></Nav>
      <div>
        <Toolbar />
        <IdealBudget></IdealBudget>
      </div>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    darkMode: state.pageState.darkMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
