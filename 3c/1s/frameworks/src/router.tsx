import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Root } from './pages/root';
import { Main } from './pages/main';
import { NotFound } from './pages/NotFound';
import { CategoriesPage } from './pages/categories';
import { ProductsPage } from './pages/products';
import { ProductPage } from './pages/product';
import { Cart } from './pages/cart';
import { CategoryProductsPage } from './pages/categoryProducts';
import { SalesPage } from './pages/sales';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Main />} />
      <Route path="categories">
        <Route index element={<CategoriesPage />} />
        <Route path=":categoryId" element={<CategoryProductsPage />} />
      </Route>
      <Route path="products">
        <Route index element={<ProductsPage />} />
        <Route path=":productId" element={<ProductPage />} />
      </Route>
      <Route path="sales" element={<SalesPage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
