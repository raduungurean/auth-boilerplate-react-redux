import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  errorField: {
    borderColor: '#ff0000',
    color: '#ff0000',
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  linkScreen: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'none',
    },
  },
}));

export default useStyles;
