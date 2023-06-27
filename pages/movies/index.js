import axios from "axios";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
function MoviesList({ movies }) {
  return (
    <>
      <h2>Product 1</h2>
      <List>
        {movies.map((movie) => {
          return (
            <ListItem key={movie._id}>
              <ListItemText primary={movie.title} secondary={movie.language} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default MoviesList;

export async function getStaticProps(context) {
  //   const router = useRouter();
  console.log(context);
  const data = await axios.get("http://localhost:8000/api/movies");
  const movies = await data.data.data;
  return {
    props: {
      movies: movies,
    },
  };
}
