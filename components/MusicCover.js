import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
export default function MusicCover({ movie }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary",
          padding: 5,
          paddingTop: 1,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            flexWrap: "wrap",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 200, align: "center" }}
            image={`https://masstamilan.dev` + movie.img}
            alt={movie.title}
            loading="lazy"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto", flexWrap: "wrap" }}>
              <Typography component="span" variant="h7">
                Album
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  wordWrap: "break-word",
                  whiteSpace: "pre-line",
                }}
                variant="h1"
              >
                {movie.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {movie.music}
                </Typography>
                | <Typography>{movie.year}</Typography> |{" "}
                <Typography>{movie.songs.length} Songs</Typography>
              </Box>
            </CardContent>
          </Box>
        </Card>
        <Card>
          <CardContent>
            <Typography>
              <b>Starring: </b>
              {movie.stars.join(" , ")}
            </Typography>
            <Typography>
              <b>Director: </b>
              {movie.director.join(" , ")}
            </Typography>
            <Typography>
              <b>Language: </b> {movie.language}
            </Typography>
            <Typography>
              <b>Lyrics: </b> {movie.lyrics}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
