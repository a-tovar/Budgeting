import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
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
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
  title: {
    marginLeft: "20px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function Nav() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              <Menu />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              Quantum
            </Typography>
            <div>
              <span>log out</span>
              <IconButton color="inherit" aria-label="dark mode" edge="end">
                <BrightnessMedium />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          container="true"
          variant="persistent"
          anchor="left"
          open={true}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar />
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
