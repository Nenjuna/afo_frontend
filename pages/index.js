import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MainLanding from "../components/MainLanding";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function Index({ main }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {main.map((lan) => (
        <Box
          key={lan._id}
          sx={{
            width: "auto",
            paddingLeft: 5,
            paddingBottom: 2,
            paddingTop: 2,
            paddingRight: 2,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              paddingBottom: 2,
            }}
          >
            {`Latest ${lan._id} Updates - Download ${lan._id} Songs`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              // paddingLeft: 5,
              // paddingBottom: 2,
              // paddingTop: 2,
              gap: "20px",
            }}
          >
            {lan.movieS.map((movie) => (
              <MainLanding movie={movie} key={movie.title} />
            ))}
          </Box>
          <Link
            href={`/${lan._id.toLowerCase()}`}
            style={{ textDecoration: "underline" }}
            color="secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              align="right"
              variant="h5"
              component="h3"
              display="flex"
            >
              {`Find all ${lan._id} movie songs here`}
            </Typography>
            <KeyboardDoubleArrowRightIcon />
          </Link>
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
        destination: "/404",
      },
    };
  return { props: { main } };
};
