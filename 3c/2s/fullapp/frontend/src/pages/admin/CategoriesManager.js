// src/pages/admin/CategoriesManager.js
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleOpen = (category = null) => {
    if (category) {
      setEditCategory(category);
      setFormData(category);
    } else {
      setEditCategory(null);
      setFormData({ name: '', description: '', image_url: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditCategory(null);
  };

  const handleSubmit = async () => {
    try {
      if (editCategory) {
        await axios.put(`http://localhost:5000/api/categories/${editCategory.id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/categories', formData);
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <>
      <Button 
        variant="contained" 
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Добавить категорию
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Изображение</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Кол-во товаров</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Avatar
                    src={category.image_url}
                    alt={category.name}
                    variant="rounded"
                  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.products_count}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(category.id)}
                    disabled={category.products_count > 0}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editCategory ? 'Редактировать категорию' : 'Добавить категорию'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Название"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Описание"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="URL изображения"
            fullWidth
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editCategory ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoriesManager;