// src/pages/admin/OrdersManager.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { OrderStatus } from '../../models/OrderStatus';
import axios from 'axios';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders', {
        params: { status: statusFilter }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus
      });
      fetchOrders();
      setDetailsOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setSelectedOrder(response.data);
      setDetailsOpen(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
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
    <>
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
              <TableCell>ID заказа</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Покупатель</TableCell>
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
                <TableCell>{order.user_id}</TableCell>
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
                    onClick={() => fetchOrderDetails(order.id)}
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
              <Typography gutterBottom>
                Дата: {formatDate(selectedOrder.created_at)}
              </Typography>
              <Typography gutterBottom>
                Адрес доставки: {selectedOrder.shipping_address}
              </Typography>
              <Typography gutterBottom>
                Сумма: {selectedOrder.total_amount} ₽
              </Typography>
              
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
                      const product = item.product;
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{product ? product.name : 'Ошибка загрузки товара'}</TableCell>
                          <TableCell>{item.price} ₽</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price * item.quantity} ₽</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TextField
                select
                fullWidth
                label="Статус заказа"
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                sx={{ mt: 2 }}
              >
                {Object.values(OrderStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default OrdersManager;