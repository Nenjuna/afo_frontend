import axios from "axios";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MusicCover from "../../components/MusicCover";
import Songs from "../../components/Songs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MoreBy from "../../components/MoreBy";

export const getServerSideProps = async (context) => {
  const query = context.query.movie;
  //https://oyster-app-l4qvg.ondigitalocean.app/afo-backend
  const data = await axios.get(
    `https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/movies/${query}`
  );
  const movie = await data.data.data;
  // console.log(data);
  const musicOther = await data.data.musicOther;
  return { props: { movie, musicOther } };
};

export default function MovieDetails({ movie, musicOther }) {
  const router = useRouter();
  // console.log(movie);
  const headTitle = `${movie.title} ${movie.language} Songs Download - Album by ${movie.music} | FREE4DOWNLOAD.IN`;
  const headDescription = `${
    movie.title
  } songs download. Starring ${movie.stars.join(", ")}. Music by ${
    movie.music
  }`;
  const headKeywords = `${movie.title} songs download, ${movie.title} by ${movie.music}, ${movie.title} ${movie.language} songs download, ${movie.stars[0]} in ${movie.title} songs download, ${movie.title} mps songs download, ${movie.title} songs play online`;
  const headImg = `https://masstamilan.dev` + movie.img;
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={headDescription} />
        <meta name="og:title" content={headDescription} />
        <meta name="keywords" content={headKeywords} />
        <meta name="og:type" content="music.album" />
        <meta name="og:image" content={headImg} />
      </Head>
      <MusicCover movie={movie} />
      <Songs songs={movie.songs} url={movie.url} />
      <Typography variant="h4" sx={{ paddingLeft: 5, paddingBottom: 3 }}>
        More by {movie.music}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          flexGrow: 1,
          paddingLeft: 5,
          paddingBottom: 3,
          maxWidth: {
            xs: "100%",
            md: "70%",
          },
        }}
      >
        {musicOther.map((other) => {
          return <MoreBy movie={other} key={other.title} />;
        })}
      </Box>

      <Divider variant="middle" />
    </>
  );
}
