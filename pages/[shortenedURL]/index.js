import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

import { getShortenURL } from "../../helpers/controller";

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
  backgroundImage: {
    backgroundImage: `url(background.png)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: theme.spacing(3, 5),
    gap: theme.spacing(2),
    borderRadius: "15px",
    textAlign: "center",
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  headerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: theme.spacing(1),
  },
  header: {
    fontWeight: 600,
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

const ShortenedURLPage = (props) => {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${classes.backgroundImage}`}>
      <Paper className={classes.paper} elevation={5}>
        <div className={classes.headerSection}>
          <Image src={"/logo.png"} alt="logo" width={80} height={80} />
          <Typography variant="h2" className={classes.header}>
            ShortenLah!
          </Typography>
        </div>
        <Typography variant="h6" style={{ fontWeight: 500 }}>{`We can't seem to find any page here!`}</Typography>
      </Paper>
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
