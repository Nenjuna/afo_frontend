import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Player from "./Player";
import Download from "./Download";

export default function Songs({ songs, url }) {
  const [songstate, setSongs] = useState([]);

  useEffect(() => {
    async function loadMusic() {
      const murl = url.replace("tamilpaatu.com", "masstamilan.dev");
      const data = await axios.get(
        `https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/getMovie`,
        {
          params: {
            url: murl,
          },
        }
      );
      const music = await data.data.songs;
      setSongs(music);
    }
    loadMusic();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "primary",
        padding: {
          xs: 2,
          md: 5,
        },
        paddingTop: 1,
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Play Online</TableCell>
              <TableCell align="left">Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs?.map((song, index) => (
              <TableRow
                key={song.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography>{index + 1}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Stack>
                    <Typography>
                      <b>{song.title}</b>
                    </Typography>
                    <Typography color="text.secondary" fontSize="0.8rem">
                      {song.singers}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">
                  <Player
                    {...{
                      songstate,
                      curr: song.title,
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <Download
                    {...{
                      songstate,
                      curr: song.title,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
