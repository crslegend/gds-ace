import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { shortenURL } from "../helpers/controller";
import { domain } from "../config/index";

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
  lowerSection: {
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

  const [shortenedUrl, setShortenedUrl] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleShorten = () => {
    setShortening(true);
    setShowResult(false);
    shortenURL(url)
      .then((res) => {
        // console.log(res);
        setShortenedUrl(res.data);
        setShowResult(true);
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

      {showResult ? (
        <div className={classes.lowerSection}>
          <TextField
            variant="outlined"
            margin="dense"
            color="secondary"
            fullWidth
            value={domain + shortenedUrl}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CopyToClipboard
                    text={domain + shortenedUrl}
                    onCopy={() => enqueueSnackbar("URL copied", { variant: "success" })}
                  >
                    <Button variant="contained" color="secondary" edge="end" size="small">
                      Copy
                    </Button>
                  </CopyToClipboard>
                </InputAdornment>
              ),
            }}
            disabled
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disabled={url === "" || !url}
            onClick={() => {
              setUrl("");
              setShowResult(false);
            }}
          >
            Shorten Another
          </Button>
        </div>
      ) : (
        <div className={classes.lowerSection}>
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
                  <IconButton edge="end" size="small" onClick={() => setUrl("")} disabled={shortening}>
                    <Cancel />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={shortening}
          />
          {shortening ? (
            <Button variant="contained" color="secondary" fullWidth startIcon={<CircularProgress size="1.5rem" />}>
              Shortening
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disabled={url === "" || !url}
              onClick={() => handleShorten()}
            >
              Shorten Lah
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
