import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const drawerWidth = 240; // TODO: make this some kind of global shiz

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  rootMenuOpen: {
    display: "flex",
    marginLeft: drawerWidth,
  },
}));

function Test(props) {
  const classes = useStyles();
  return (
    <>
      <div className={clsx(props.menuOpen && classes.rootMenuOpen)}>
        hello there this is some random content pls enjoy
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
