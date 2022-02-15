import React, { useState } from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, IconButton, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
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
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      padding: theme.spacing(3, 3),
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
  lowerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: theme.spacing(1),
  },
  textField: {
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
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
    <div className={`${classes.container} ${classes.backgroundImage}`}>
      <Paper className={classes.paper} elevation={5}>
        <div className={classes.headerSection}>
          <Image src={"/logo.png"} alt="logo" width={80} height={80} />
          <Typography variant="h2" className={classes.header}>
            ShortenLah!
          </Typography>
          <Typography variant="body1" style={{ fontStyle: "italic", fontWeight: 300 }}>
            {`Singaporeans' Go-to URL Shortener`}
          </Typography>
        </div>

        {showResult ? (
          <div className={classes.lowerSection}>
            <TextField
              variant="outlined"
              margin="dense"
              color="primary"
              fullWidth
              value={domain + shortenedUrl}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CopyToClipboard
                      text={domain + shortenedUrl}
                      onCopy={() => enqueueSnackbar("URL copied", { variant: "success" })}
                    >
                      <Button variant="contained" color="primary" edge="end" size="small">
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
              className={classes.textField}
              variant="outlined"
              margin="dense"
              color="primary"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.google.com/"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      edge="end"
                      size="small"
                      onClick={() => setUrl("")}
                      disabled={shortening}
                    >
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
      </Paper>
    </div>
  );
};

export default Home;
