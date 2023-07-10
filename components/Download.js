import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function Download({ songstate, curr }) {
  const [isDownload, setIsDownload] = useState(false);
  const [downURL, setdownURL] = useState(null);

  async function downloadFile() {
    const baseURL = "https://masstamilan.dev";
    const found = songstate.filter((song) => song.title === curr);
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
      setdownURL({
        d128: song128.data,
        d320: song320.data,
      });
      setIsDownload(true);

      return [song128, song320];
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isDownload ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "space-between",
            }}
            startIcon={<DownloadForOfflineIcon />}
            download={downURL.d128}
          >
            128 KBPS
          </Button>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "space-between",
            }}
            startIcon={<DownloadForOfflineIcon />}
            download={downURL.d320}
          >
            320 KBPS
          </Button>
        </Box>
      ) : (
        <IconButton onClick={downloadFile}>
          <FileDownloadOutlinedIcon />
        </IconButton>
      )}
    </>
  );
}

export default Download;
