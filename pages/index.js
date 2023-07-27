import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MainLanding from "../components/MainLanding";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Head from "next/head";

export default function Index({ main }) {
  const headTitle = `Free4Download.in | Free Download of movies, songs, bgms, manga and many more`;
  const headDescription = `Download all latest movie songs, bgms, ringtones, full movies and manga for free. You can download all of these for free from Free4Download.in`;
  const fullURL = `https://free4download.in`;
  const headKeywords = `latest songs download, tamil songs download, telugu songs download, hindi songs download, malayalam songs download, free4download, online manga reader, download moveis online, play songs online`;
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={headDescription} />
        <meta property="og:site_name" content="Free4Download.in" />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headDescription} />
        <meta name="keywords" content={headKeywords} />
        <meta property="og:url" content={fullURL} />
        <link href={fullURL} rel="canonical" />
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {main.map((lan) => (
          <Box
            key={lan._id}
            sx={{
              width: "auto",
              paddingLeft: 5,
              paddingBottom: 2,
              paddingTop: 2,
              paddingRight: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                paddingBottom: 2,
              }}
            >
              {`Latest ${lan._id} Updates - Download ${lan._id} Songs`}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                // paddingLeft: 5,
                // paddingBottom: 2,
                // paddingTop: 2,
                gap: "20px",
              }}
            >
              {lan.movieS.map((movie) => (
                <MainLanding movie={movie} key={movie.title} />
              ))}
            </Box>
            <Link
              href={`/${lan._id.toLowerCase()}`}
              style={{ textDecoration: "underline" }}
              color="secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                align="right"
                variant="h5"
                component="h3"
                display="flex"
              >
                {`Find all ${lan._id} movie songs here`}
              </Typography>
              <KeyboardDoubleArrowRightIcon />
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await axios.get(
    `https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/main/updated`
  );
  const main = await data.data.main;

  if (!main)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return { props: { main } };
};
