import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";

export default function Landing({ movie }) {
  // console.log(movie);
  return (
    <Card sx={{ maxWidth: 280 }}>
      <Link
        href={`/${movie?.language.toLowerCase()}/${movie.title
          .replaceAll(" ", "_")
          .toLowerCase()}`}
        style={{ textDecoration: "none" }}
        color="inherit"
      >
        <CardActionArea sx={{ maxWidth: 300, height: "100%" }}>
          <CardMedia
            component="img"
            height="220"
            image={`https://masstamilan.dev` + movie.img}
            alt={movie.title}
            loading="lazy"
          />
          <CardContent height="300">
            <Typography gutterBottom variant="h5" component="h5">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Starring:</b> {movie.stars.join(" , ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Music:</b> {movie.music.join(" , ")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
