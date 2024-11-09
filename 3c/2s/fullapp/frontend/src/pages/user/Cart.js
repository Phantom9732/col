// src/pages/user/Cart.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { updateCartCount } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCartItems(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/update/${itemId}`, {
        quantity: newQuantity
      });
      fetchCart();
      updateCartCount();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`);
      fetchCart();
      updateCartCount();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!shippingAddress.trim()) {
        alert('Пожалуйста, введите адрес доставки');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/orders', {
        shipping_address: shippingAddress
      });

      setOrderDialogOpen(false);
      updateCartCount();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ошибка при создании заказа';
      alert(errorMessage);
    }
  };

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (cartItems.length === 0) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Ваша корзина пуста
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Перейти к покупкам
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Товар</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="center">Количество</TableCell>
              <TableCell align="right">Сумма</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell align="right">{item.product.price} ₽</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">{item.total_price} ₽</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => removeItem(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h5">
          Итого: {total} ₽
        </Typography>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setOrderDialogOpen(true)}
        >
          Оформить заказ
        </Button>
      </Box>

      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)}>
        <DialogTitle>Оформление заказа</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Адрес доставки"
            fullWidth
            multiline
            rows={3}
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleCheckout} variant="contained">
            Подтвердить заказ
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;