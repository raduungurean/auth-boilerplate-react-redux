import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';

const MySnackbar = ({
  messages,
  isOpen,
  variant,
  handleClose,
  messageAction,
  onAction,
}) => {
  const message = messages[Object.keys(messages)[0]] ? messages[Object.keys(messages)[0]] : '';

  if (!messageAction) {
    messageAction = true;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        action={
          typeof messageAction === 'boolean' ? (
            <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
              <CloseIcon style={{ fontSize: 20 }} />
            </IconButton>
          ) : <Button color="inherit" size="small" onClick={onAction}>{messageAction}</Button>
        }
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

MySnackbar.defaultProps = {
  messageAction: undefined,
  onAction: undefined,
};

MySnackbar.propTypes = {
  messageAction: PropTypes.string,
  onAction: PropTypes.func,
  messages: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MySnackbar;
