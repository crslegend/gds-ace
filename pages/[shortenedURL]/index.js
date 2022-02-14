import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getShortenURL } from "../../helpers/controller";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
}));

const ShortenedURLPage = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>logo here</Typography>
      <Typography variant="h6">{`Can't seem to find the page leh!`}</Typography>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { shortenedURL } = context.params;

  return await getShortenURL(shortenedURL)
    .then((res) => {
      return {
        redirect: {
          destination: res.data.entered_url,
          permanent: false,
        },
      };
    })
    .catch((err) => {
      return {
        props: {},
      };
    });
}

export default ShortenedURLPage;
