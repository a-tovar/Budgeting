import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import Nav from "./components/navbar/nav";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#99f2d4",
      dark: "#2f4454",
    },
    secondary: {
      main: "#edf5e1",
      dark: "#2e151b",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Nav></Nav>
        <div>
          <Toolbar />
          content
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
