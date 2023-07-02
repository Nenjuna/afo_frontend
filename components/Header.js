import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

export default function Headers() {
  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        alignItems: {
          xs: "center",
          md: "flex-start",
        },
      }}
    >
      <Toolbar>
        <Typography component="div" variant="h6">
          All For One
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
