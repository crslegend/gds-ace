import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import theme from "../styles/theme";

const MyApp = (props) => {
  const { Component, pageProps } = props;

  // add action to all snackbars
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>ShortenLah!</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={2}
          ref={notistackRef}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          action={(key) => (
            <Button onClick={onClickDismiss(key)} style={{ color: "#fff" }}>
              Dismiss
            </Button>
          )}
        >
          <CssBaseline />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
