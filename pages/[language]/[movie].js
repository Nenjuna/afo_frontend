import axios from "axios";
import React from "react";
import Head from "next/head";
import MusicCover from "../../components/MusicCover";
import Songs from "../../components/Songs";

export const getServerSideProps = async (context) => {
  const query = context.query.movie;
  const data = await axios.get(`http://localhost:8000/api/movies/${query}`);
  const movie = await data.data.data[0];
  return { props: { movie } };
};

export default function MovieDetails({ movie }) {
  return (
    <>
      <Head>
        <title>{`${movie.title} ${movie.language} Songs Download - AFO`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MusicCover movie={movie} />
      <Songs songs={movie.songs} />
      {/* <h1>Movie details {movie.title}</h1> */}
    </>
  );
}
