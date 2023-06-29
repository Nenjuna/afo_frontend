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

const navItems = ["Latest Update", "Movie Index", "Contact"];

const drawer = (
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="h6" sx={{ md: 2 }} component="div">
      MUI
    </Typography>
    <Divider />
    <List>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);
export default function Headers() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="div" variant="h6">
          All For One
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
