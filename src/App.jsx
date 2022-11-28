import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Reset } from 'styled-reset';

import theme from './styles/theme';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderPage from './pages/OrderPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </ThemeProvider>
  );
}
