import axios from "axios";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MusicCover from "../../components/MusicCover";
import Songs from "../../components/Songs";

export const getServerSideProps = async (context) => {
  const query = context.query.movie;
  const data = await axios.get(
    `https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/movies/${query}`
  );
  const movie = await data.data.data;
  return { props: { movie } };
};

export default function MovieDetails({ movie }) {
  const router = useRouter();
  console.log(router);
  const headTitle = `${movie.title} ${movie.language} Songs Download - AFO`;
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
      {/* <h1>Movie details {movie.title}</h1> */}
    </>
  );
}
