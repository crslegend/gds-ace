import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFBF6",
    },
    secondary: {
      main: "#8B5725",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Work Sans",
    h1: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 48,
    },
    h2: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 42,
    },
    h3: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 36,
    },
    h4: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 32,
    },
    h5: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 22,
    },
    h6: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 20,
    },
    subtitle1: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 18,
    },
    body1: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 16,
    },
    body2: {
      // fontFamily: "Museo Sans Cyrl 300",
      fontSize: 14,
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

export default theme;
