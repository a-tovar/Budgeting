import React from "react";
import { connect } from "react-redux";
// import * as actions from "../../reducers/index";
import { toggleMenu, toggleTheme } from "../../reducers/pageStateReducer";
import clsx from "clsx";

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
} from "@material-ui/core";
import {
  Menu,
  BrightnessMedium,
  BarChart,
  AccountBox,
  MonetizationOn,
  Apps,
  Settings,
  Info,
  ChevronLeft,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { menuDrawerWidth } from "../../constants/styleConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${menuDrawerWidth}px)`,
    marginLeft: menuDrawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  drawer: {
    width: menuDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: menuDrawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function Nav(props) {
  const classes = useStyles();
  const toggleMenu = () => {
    props.toggleMenu();
  };
  const toggleTheme = () => {
    props.toggleTheme();
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: props.menuOpen,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleMenu}
              className={clsx(props.menuOpen && classes.hide)}
            >
              <Menu />
            </IconButton>
            <Typography variant="h5">Quantum</Typography>
            <div>
              <span>log out</span>
              <IconButton
                color="inherit"
                aria-label="dark mode"
                edge="end"
                onClick={toggleTheme}
              >
                <BrightnessMedium />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          container="true"
          variant="persistent"
          anchor="left"
          open={props.menuOpen}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleMenu}>
              <ChevronLeft />
            </IconButton>
          </div>
          {/* <Toolbar /> */}
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="Main"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Account"></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText primary="Ideal Budget"></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Apps />
              </ListItemIcon>
              <ListItemText primary="Categories"></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings"></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About"></ListItemText>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
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
  return {
    toggleMenu: () => dispatch(toggleMenu()),
    toggleTheme: () => dispatch(toggleTheme()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
