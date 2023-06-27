import { useRouter } from "next/router";
import axios from "axios";
function MovieDetails() {
  const router = useRouter();
  const movieID = router.query.movie;

  //   console.log(router);
  return <h1>Movie details {movieID}</h1>;
}

export default MovieDetails;
