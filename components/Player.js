import useSound from "use-sound";
import IconButton from "@mui/material/IconButton";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Player({ songstate, audioRef, curr }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songURL, setSongURL] = useState("");
  const playRef = useRef(null);
  const togglePlayPause = async () => {
    console.log(curr);
    const baseURL = "https://masstamilan.dev";
    const found = songstate.filter((song) => song.title === curr);
    if (!isPlaying && songURL.length == "") {
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
        // playRef.current = new Audio(songURL);
        setSongURL(audio);
      } catch (error) {
        console.log(error);
      }
    }
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    // console.log(songURL);
    if (isPlaying) {
      playRef.current = new Audio(songURL);
      playRef.current.play();
    } else {
      playRef.current.pause();
    }
  }, [isPlaying, playRef, songURL]);

  return (
    <>
      <IconButton onClick={togglePlayPause}>
        <audio ref={playRef} />
        {!isPlaying ? (
          <PlayCircleOutlineOutlinedIcon />
        ) : (
          <PauseCircleOutlineOutlinedIcon />
        )}
      </IconButton>
    </>
  );
}

export default Player;
