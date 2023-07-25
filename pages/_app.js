import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/Breadcrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());

  //BreadCrumbs
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      // console.log(path);
      path = path
        .replaceAll("_", " ")
        .split(/ /g)
        .map(
          (word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
        )
        .join(" ");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);
  // console.log(breadcrumbs);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Hydrate state={pageProps.dehydratedState}>
            <Header />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                padding: {
                  sx: 2,
                  md: 5,
                },
                paddingBottom: 1,
                paddingTop: 1,
                paddingLeft: 2,
              }}
            >
              <Breadcrumb breads={breadcrumbs} />
            </Box>
            <Component {...pageProps} />
            <Footer />
          </Hydrate>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
