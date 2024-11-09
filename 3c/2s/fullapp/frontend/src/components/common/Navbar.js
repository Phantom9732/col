// src/components/common/Navbar.js
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  Badge
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, isAdmin, logout, cartItemsCount } = useAuth(); // Использовать контекст

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: Добавить логику выхода
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Pet Shop
        </Typography>

        {!isAuthenticated ? (
          <div>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Войти
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Регистрация
            </Button>
          </div>
        ) : (
          <div>
            {!isAdmin && (
              <IconButton 
                color="inherit" 
                onClick={() => navigate('/cart')}
              >
                <Badge badgeContent={cartItemsCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            )}
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isAdmin ? (
                <MenuItem onClick={() => navigate('/admin')}>
                  Панель администратора
                </MenuItem>
              ) : (
                <MenuItem onClick={() => navigate('/dashboard')}>
                  Личный кабинет
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;