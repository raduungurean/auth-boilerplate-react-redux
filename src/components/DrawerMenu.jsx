import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { IoMdFootball } from 'react-icons/io';
import { FaSignOutAlt, FaTshirt } from 'react-icons/fa';
import {
  Group, Person, RemoveCircle, Settings,
} from '@material-ui/icons';

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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1) * 3,
  },
});

export const DrawerMenu = (props) => {
  const {
    classes, theme, expanded, toggleDrawer, menuItems,
  } = props;

  const navigateTo = (path) => {
    props.history.push(path);
    props.toggleDrawer();
  };

  const mapper = {
    IoMdFootball,
    FaTshirt,
    RemoveCircle,
    Group,
    Person,
    Settings,
    FaSignOutAlt,
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuItems.map((menuItem, index) => {
          const Type = mapper[menuItem.component];
          const inputProps = menuItem.size ? {
            size: menuItem.size,
          } : {};
          return (
            <ListItem onClick={() => navigateTo(menuItem.path)} button key={menuItem.title}>
              <ListItemIcon><Type {...inputProps} /></ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={expanded}
        onClose={() => {
          toggleDrawer();
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

DrawerMenu.defaultProps = {
  history: undefined,
};

DrawerMenu.propTypes = {
  classes: PropTypes.shape({ }).isRequired,
  theme: PropTypes.shape({ direction: PropTypes.string }).isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }),
};

export default withStyles(styles, { withTheme: true })(withRouter(DrawerMenu));
