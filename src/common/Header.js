import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation, useHistory, Link } from "react-router-dom";

export default function Header(props) {
    const location = useLocation();
    const history = useHistory()
    const { token, updateToken } = props;
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        updateToken()

    }

    
    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Expense Tracker
                        </Typography>
                        
                        {
                            token 
                            ?   <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
                            :   location.pathname === "/login"
                            ?   <Button component={Link} to="/register" color="inherit">
                                    Register
                                </Button>
                            :    <Button component={Link} to="/login" color="inherit">
                                    Login
                                </Button>
                            
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}
