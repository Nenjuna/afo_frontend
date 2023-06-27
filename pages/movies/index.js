import axios from "axios";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import Landing from "../../components/Landing";
import Box from "@mui/material/Box";

function MoviesList({ movies }) {
  return (
    <>
      <h2>Product 1</h2>
      <List>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {movies.map((movie) => {
            return <Landing movie={movie} />;
          })}
        </Box>
      </List>
    </>
  );
}

export default MoviesList;

export async function getStaticProps() {
  const data = await axios.get(
    "https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/movies"
    // "http://localhost:8000/api/movies"
  );
  const movies = await data.data.data;
  return {
    props: {
      movies: movies,
    },
  };
}
