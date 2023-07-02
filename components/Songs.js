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
import IconButton from "@mui/material/IconButton";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Songs({ songs, url }) {
  const [songstate, setSongs] = useState([]);
  async function handleClick(e, songname) {
    const baseURL = "https://masstamilan.dev";
    const found = songstate.filter((song) => song.title === songname);
    try {
      const [song128, song320] = await Promise.all([
        axios.get(
          "https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/getSongURL",
          {
            params: {
              url: baseURL + found[0].songURL128,
            },
          }
        ),
        axios.get(
          "https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/getSongURL",
          {
            params: {
              url: baseURL + found[0].songURL320,
            },
          }
        ),
      ]);
      console.log(song128, song320);
    } catch (error) {
      console.log(error);
    }
  }
  async function playAudio(e, songname) {
    const baseURL = "https://masstamilan.dev";
    const found = songstate.filter((song) => song.title === songname);
    try {
      const audioData = await axios.get(
        "https://oyster-app-l4qvg.ondigitalocean.app/afo-backend/getSongURL",
        {
          params: {
            url: baseURL + found[0].songURL128,
          },
        }
      );
      const audio = audioData.data;
      const player = new Audio(audio);
      player.play();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadMusic() {
      //   console.log(url);
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
      console.log(music);
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
                  <IconButton onClick={(e) => playAudio(e, song.title)}>
                    <PlayCircleOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={(e) => handleClick(e, song.title)}>
                    <FileDownloadOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
