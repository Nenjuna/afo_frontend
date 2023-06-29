import axios from "axios";
import List from "@mui/material/List";
import { useRouter } from "next/router";
import Landing from "../../components/Landing";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

function MoviesList({ movies }) {
  return (
    <>
      <Header />
      <List>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexGrow: 1,
            padding: 5,
            maxWidth: {
              xs: "100%",
              md: "70%",
            },
            // justifyContent: "center",
            // alignContent: "space-between",
            // alignItems: "center",
            // justifyItems: "center",
            gap: "20px",
          }}
        >
          {movies.map((movie) => {
            return <Landing movie={movie} key={movie._id} />;
          })}
        </Box>
      </List>
    </>
  );
}

export default MoviesList;

export async function getServerSideProps() {
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
