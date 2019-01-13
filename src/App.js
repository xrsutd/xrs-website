import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// import Avatar from '@material-ui/core/Avatar';
// import ButtonBase from '@material-ui/core/ButtonBase';
import MediaQuery from 'react-responsive';
import moment from 'moment';

import Home from './Home';
import Team from './Team';
import Events from './Events';
import Join from './Join';
import Apply from './Apply';
import Contact from './Contact';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuItem: {
    color: '#512DA8', // ripple
    width: '100%',
    '&:hover': {
      background: '#b2dfdb',
    },
  },
  logoButton: {
    color: '#512DA8',
    borderRadius: '50%',
    marginLeft: 16,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    background: '#0a9998',
  },
  menuButton: {
    marginRight: 6,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    marginTop: 64,
  },
  selectedItem: {
    background: '#b2dfdb !important', // doesn't work if `!important` is not set
  },
  logo: {
    height: 56,
    width: 56,
  },
  toolbarInner: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
  },
  selectedText: {
    color: '#0a9998',
  },
  itemText: {
    color: '#212121',
  },
  footer: {
    minHeight: 96,
    background: '#46474f',
    color: '#fff',
    padding: 16,
    fontSize: 12,
    position: 'relative',
  },
  innerContent: {
    padding: 16,
    minHeight: 'calc(100vh - 160px)',
    maxWidth: 796,
    overflow: 'scroll',
    margin: '0 auto',
  },
});

class App extends Component {
  state = {
    mobileOpen: false,
    selectedIndex: 0,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    if (this.state.mobileOpen) this.handleDrawerToggle();
  };

  render() {
    const { classes, theme } = this.props;
    const { router } = this.context
    const { path } = this.props
    if (path && router) {
      const { location } = router
      console.log(location.pathname)
    }

    const drawer = (
      <div>
        {console.log(this.props)}
        <div className={classes.toolbar}>
          <div className={classes.toolbarInner}>
          {/* <ButtonBase className={classes.logoButton}>
            <Avatar 
              src={process.env.PUBLIC_URL + '/logo.png'} 
              className={classes.logo} 
              component={Link}
              onClick={event => this.handleListItemClick(event, 0)}
              to="/" />
          </ButtonBase> */}
          </div>
        </div>
        <Divider />
        <List>
          {[
            {name: "Home", link: "/", icon: "home"},
            {name: "Team", link: "/team/", icon: "group"},
            {name: "Events", link: "/events/", icon: "event"},
            {name: "Join", link: "/join/", icon: "person_add"}, 
            {name: "Apply", link: "/apply/", icon: "edit"},
            {name: "Contact", link: "/contact/", icon: "mail_outline"}
          ].map((item, index) => (
            <ListItem
              key={index}
              button
              dense
              className={classes.menuItem}
              component={Link}
              to={item.link}
              selected={this.state.selectedIndex === index}
              onClick={event => this.handleListItemClick(event, index)}
              classes={{
                selected: classes.selectedItem
              }}
            >
              <Icon className={this.state.selectedIndex === index ? classes.selectedText : classes.itemText} fontSize="small">{item.icon}</Icon>
              <div style={{marginLeft: 16}} className={this.state.selectedIndex === index ? classes.selectedText : classes.itemText}>{item.name}</div>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (

      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <Icon>menu</Icon>
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                <MediaQuery query="(min-width: 345px)">
                  Extended Reality Society
                </MediaQuery>
                <MediaQuery query="(max-width: 344px)">
                  XRS
                </MediaQuery>
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.innerContent}>
              <Route path="/" exact component={Home} />
              <Route path="/team/" component={Team} />
              <Route path="/events/" component={Events} />
              <Route path="/join/" component={Join} />
              <Route path="/apply/" component={Apply} />
              <Route path="/contact/" component={Contact} />
            </div>
            <div className={classes.footer}>
              <span style={{position:'absolute', bottom:42, right:16}}><a style={{color:'#fff', textDecoration:'none'}} href="https://utdallas.edu" target="_blank" rel="noopener noreferrer">The University of Texas at Dallas</a></span>
              <span style={{position:'absolute', bottom:16, right:16}}>&copy; {moment().format('YYYY')} Extended Reality Society</span>
            </div>
        </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
