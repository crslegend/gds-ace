import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
  loader: {
    color: theme.palette.secondary.main,
  },
}));

const Home = () => {
  const classes = useStyles();
  return <div className={classes.container}>Home</div>;
};

export default Home;
