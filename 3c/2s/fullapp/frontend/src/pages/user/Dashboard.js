// src/pages/user/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Box,
  TextField,
  MenuItem
} from '@mui/material';
import { OrderStatus } from '../../models/OrderStatus';
import axios from 'axios';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Orders response:', response.data); // Для отладки
      // Проверка структуры данных
      response.data.forEach(order => {
        console.log('Order items:', order.items);
        order.items.forEach(item => {
          console.log('Item product:', item.product);
        });
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error details:', error.response?.data); // Детали ошибки
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      [OrderStatus.PENDING]: 'warning',
      [OrderStatus.PROCESSING]: 'info',
      [OrderStatus.SHIPPED]: 'primary',
      [OrderStatus.DELIVERED]: 'success',
      [OrderStatus.CANCELLED]: 'error'
    };
    return colors[status] || 'default';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои заказы
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          select
          label="Фильтр по статусу"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Все заказы</MenuItem>
          {Object.values(OrderStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер заказа</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>{order.total_amount} ₽</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status}
                    color={getStatusColor(order.status)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedOrder(order);
                      setDetailsOpen(true);
                    }}
                  >
                    Детали
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Заказ №{selectedOrder.id}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Дата: {formatDate(selectedOrder.created_at)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Адрес доставки: {selectedOrder.shipping_address}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1">
                    Статус:
                  </Typography>
                  <Chip 
                    label={selectedOrder.status}
                    color={getStatusColor(selectedOrder.status)}
                  />
                </Box>
              </Box>

              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Товар</TableCell>
                      <TableCell>Цена</TableCell>
                      <TableCell>Количество</TableCell>
                      <TableCell>Сумма</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item) => {
                      console.log('Item data:', item); // Для отладки
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.product?.name || 'Товар недоступен'}</TableCell>
                          <TableCell>{item.price} ₽</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price * item.quantity} ₽</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default UserDashboard;