import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MainLanding from "../components/MainLanding";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function Index({ main }) {
  // console.log(main);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {main.map((lan) => (
        <Box key={lan._id}>
          <Typography
            component="h2"
            sx={{
              paddingLeft: 5,
            }}
          >
            Latest {lan._id} Updates | Download {lan._id}
            Songs
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexGrow: 1,
              paddingLeft: 5,
              paddingBottom: 2,
              paddingTop: 2,
              maxWidth: {
                xs: "100%",
                md: "70%",
              },
              gap: "20px",
            }}
          >
            {lan.movieS.map((movie) => (
              <MainLanding movie={movie} key={movie.title} />
            ))}
          </Box>
          {/* <Divider variant="middle" /> */}
        </Box>
      ))}
    </Box>
  );
}

export const getServerSideProps = async () => {
  const data = await axios.get(
    `https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/api/main/updated`
  );
  const main = await data.data.main;

  if (!main)
    return {
      redirect: {
        permanent: false,
        destination: "/about",
      },
    };
  return { props: { main } };
};
