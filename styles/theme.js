import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4385da",
    },
    secondary: {
      main: "#762080",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 955, // modified this breakpoint value, default is 960
      lg: 1280,
      xl: 1920,
    },
  },
});

theme.typography.h1 = {
  fontFamily: "Work Sans",
  fontSize: "2.25rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
};

theme.typography.h2 = {
  fontFamily: "Work Sans",
  fontSize: "1.875rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.625rem",
  },
};

theme.typography.h3 = {
  fontFamily: "Work Sans",
  fontSize: "1.75rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
};

theme.typography.h4 = {
  fontFamily: "Work Sans",
  fontSize: "1.625rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.375rem",
  },
};

theme.typography.h5 = {
  fontFamily: "Work Sans",
  fontSize: "1.375rem",
  fontWeight: 400,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
};

theme.typography.h6 = {
  fontFamily: "Work Sans",
  fontSize: "1.25rem",
  fontWeight: 400,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
};

theme.typography.subtitle1 = {
  fontFamily: "Work Sans",
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
  },
};

theme.typography.body1 = {
  fontFamily: "Work Sans",
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
  },
};

theme.typography.body2 = {
  fontFamily: "Work Sans",
  fontSize: "0.9375rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
};

export default theme;
