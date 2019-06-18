import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import IconButton from '@material-ui/core/IconButton/index';
import Typography from '@material-ui/core/Typography/index';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import menuItems from '../services/menuItems';
import DrawerMenu from '../components/DrawerMenu';
import { appName } from '../config';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navbar = (props) => {
  const { classes, loggedIn } = props;
  const [expendedDrawer, toggleExpandedDrawer] = useState(false);

  const toggleDrawer = () => {
    if (expendedDrawer) {
      toggleExpandedDrawer(false);
    } else {
      toggleExpandedDrawer(true);
    }
  };

  return (
    <React.Fragment>
      {loggedIn && (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {appName}
          </Typography>
        </Toolbar>
      </AppBar>
      )}
      { loggedIn && (
        <DrawerMenu
          expanded={expendedDrawer}
          toggleDrawer={toggleDrawer}
          menuItems={menuItems}
        />
      ) }
    </React.Fragment>
  );
};

Navbar.defaultProps = {
  loggedIn: null,
};

Navbar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  loggedIn: PropTypes.shape({}),
};

export default connect(
  state => ({
    loggedIn: state.auth.user,
  }),
)(withStyles(styles)(Navbar));
