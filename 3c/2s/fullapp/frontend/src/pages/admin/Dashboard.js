// src/pages/admin/Dashboard.js
import React, { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography
} from '@mui/material';
import ProductsManager from './ProductsManager';
import CategoriesManager from './CategoriesManager';
import OrdersManager from './OrdersManager';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Панель администратора
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Товары" />
          <Tab label="Категории" />
          <Tab label="Заказы" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ProductsManager />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <CategoriesManager />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <OrdersManager />
      </TabPanel>
    </Container>
  );
};

export default AdminDashboard;
