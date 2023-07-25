import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" style={{ color: "white" }}>
          404
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the main page
        </Button>
      </Box>
    </Container>
  );
}
