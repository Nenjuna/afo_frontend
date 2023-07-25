import axios from "axios";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MusicCover from "../../components/MusicCover";
import Songs from "../../components/Songs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MoreBy from "../../components/MoreBy";
import { useState, useEffect } from "react";

export const getServerSideProps = async (context) => {
  const query = context.query.movie;
  const fullURL = "https://" + context.req.headers.host + context.req.url;
  const data = await axios.get(
    `https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/movies/${query}`
  );
  const movie = await data.data.data;
  const musicOther = await data.data.musicOther;
  if (!movie)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return { props: { movie, musicOther, fullURL } };
};

export default function MovieDetails({ movie, musicOther, fullURL }) {
  const router = useRouter();
  const [language, setLanguage] = useState(router.query.language || "tamil");

  // useEffect(() => {
  //   if (router.query.language !== "tamil") {
  //     router.push(`/about`, undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [language]);

  const headTitle = `${movie.title} ${movie.language} Songs Download - Album by ${movie.music} | FREE4DOWNLOAD.IN`;
  const headDescription = `${
    movie.title
  } songs download. Starring ${movie.stars.join(", ")}. Music by ${
    movie.music
  }. You can download ${
    movie.title
  } in MP3 format in both 320 and 128 KBPS. High quality music available for streaming and download for free`;
  const headKeywords = `${movie.title} songs download, ${movie.title} by ${movie.music}, ${movie.title} ${movie.language} songs download, ${movie.stars[0]} in ${movie.title} songs download, ${movie.title} mps songs download, ${movie.title} songs play online`;
  const headImg = `https://masstamilan.dev` + movie?.img;
  const incomingSearch = [
    `${movie?.title} ${movie?.language} songs free download`,
    `${movie?.title} ${movie?.language} songs play online for free`,
    `${movie?.title} songs download 128 kbps`,
    `${movie?.title} songs download 320 kbps`,
    `${movie?.music} songs download`,
    `${movie?.stars[0]} in ${movie?.title} songs download`,
    `${movie?.title} album songs download by ${movie?.music}`,
    `${movie?.title} ${movie?.year} songs download`,
  ];
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
        <meta property="og:type" content="music.album" />
        <meta property="og:image" content={headImg} />
        <meta property="og:url" content={fullURL} />
        <link href={fullURL} rel="canonical" />
      </Head>
      <MusicCover movie={movie} />
      <Songs songs={movie?.songs} url={movie?.url} />
      <Typography variant="h4" sx={{ paddingLeft: 5, paddingBottom: 3 }}>
        More by {movie?.music}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          flexGrow: 1,
          paddingLeft: 5,
          paddingBottom: 3,
          justifyContent: {
            xs: "center",
            md: "flex-start",
          },
          alignItems: "center",
        }}
      >
        {musicOther?.map((other) => {
          return <MoreBy movie={other} key={other.title} />;
        })}
      </Box>

      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          flexGrow: 1,
          paddingLeft: 5,
          paddingBottom: 2,
          justifyContent: {
            xs: "center",
            md: "flex-start",
          },
          alignItems: "center",
        }}
      >
        <List>
          {incomingSearch?.map((search) => (
            <ListItemText primary={search} key={search}></ListItemText>
          ))}
        </List>
      </Box>
      <Divider variant="middle" />
    </>
  );
}
