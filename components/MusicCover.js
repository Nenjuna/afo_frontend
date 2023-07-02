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
          padding: {
            sx: 2,
            md: 5,
          },
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
            justifyItems: "center",
            alignItems: {
              xs: "center",
              md: "flex-start",
            },
            padding: {
              sx: 2,
              md: 5,
            },
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
            <CardContent
              sx={{
                flex: "1",
                flexWrap: "wrap",
                width: {
                  sx: "100%",
                },
              }}
            >
              <Typography
                component="span"
                variant="h7"
                sx={{
                  wordWrap: "break-word",
                }}
              >
                Album
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  wordWrap: "break-word",
                  align: "center",
                  fontSize: {
                    xs: "2rem",
                    md: "6rem",
                  },
                }}
                variant="h1"
                component="h1"
              >
                {movie?.title}
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
                <Typography>{movie?.songs?.length} Songs</Typography>
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
