import axios from "axios";

export const getServerSideProps = async (context) => {
  // console.log(context);
  const query = context.query.movie;
  // console.log(query);
  // `http://localhost:8000/api/movies/${query}`
  const data = await axios.get(`http://localhost:8000/api/movies/${query}`);
  const movie = await data.data.data[0];
  // console.log(movie);
  return { props: { movie } };
};

export default function MovieDetails({ movie }) {
  return <h1>Movie details {movie.title}</h1>;
}
