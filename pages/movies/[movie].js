import { useRouter } from "next/router";
import axios from "axios";
// function MovieDetails() {
//   const router = useRouter();
//   const movieID = router.query.movie;

//   //   console.log(router);
//   return <h1>Movie details {movieID}</h1>;
// }

// export default MovieDetails;

export const getServerSideProps = async (context) => {
  // console.log(context);
  const query = context.query.movie;
  // `http://localhost:8000/api/movies/${query}`
  const data = await axios.get(
    `https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/movies/${query}`
  );
  const movie = await data.data.data[0];
  // console.log(movie);
  return { props: { movie } };
};

export default function MovieDetails({ movie }) {
  // const router = useRouter();
  // const movieID = router.query.movie;

  //   console.log(router);
  return <h1>Movie details {movie.title}</h1>;
}
