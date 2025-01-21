import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Inventory System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/add-product">
          Add Product
        </Button>
        <Button color="inherit" component={Link} to="/add-box">
          Add Box
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
