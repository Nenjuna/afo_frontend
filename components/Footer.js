import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href="https://free4download.in/">
        Free4Download
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
