import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: grey[600],
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: grey[500],
      },
      '&.Mui-focused fieldset': {
        borderColor: grey[800],
      },
    },
  },
  paper: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
