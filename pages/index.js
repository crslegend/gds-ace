import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useSnackbar } from "notistack";

import { shortenURL } from "../helpers/controller";

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
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  actionSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    maxWidth: "500px",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  loader: {
    color: theme.palette.secondary.main,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [url, setUrl] = useState("");
  const [shortening, setShortening] = useState(false);

  const handleShorten = () => {
    setShortening(true);
    shortenURL(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // console.log(err.response.data);
        enqueueSnackbar(err.response.data, { variant: "error" });
      })
      .finally(() => setShortening(false));
  };

  return (
    <div className={classes.container}>
      <Typography>Logo here</Typography>
      <div className={classes.header}>
        <Typography variant="h2" style={{ fontWeight: 600 }}>
          ShortenLah!
        </Typography>
        <Typography variant="body1">{`Singaporeans' Go-To URL Shortener`}</Typography>
      </div>

      <div className={classes.actionSection}>
        <TextField
          variant="outlined"
          margin="dense"
          color="secondary"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.google.com/"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small" onClick={() => setUrl("")}>
                  <Cancel />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          disabled={url === "" || !url}
          onClick={() => handleShorten()}
        >
          Shorten Lah
        </Button>
      </div>
    </div>
  );
};

export default Home;
