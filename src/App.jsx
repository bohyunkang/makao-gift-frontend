import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';

import { Reset } from 'styled-reset';

import { useLocalStorage } from 'usehooks-ts';

import { apiService } from './services/ApiService';

import GlobalStyle from './styles/GlobalStyle';

import theme from './styles/theme';

import useUserStore from './hooks/useUserStore';

import ProtectedRoute from './ProtectedRoute';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderPage from './pages/OrderPage';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  useEffect(() => {
    apiService.setAccessToken(accessToken);

    if (accessToken) {
      userStore.fetchUser();
    }
  }, [accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/orders"
            element={(
              <ProtectedRoute accessToken={accessToken}>
                <OrdersPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/orders/:id"
            element={(
              <ProtectedRoute accessToken={accessToken}>
                <OrderDetailPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/order"
            element={(
              <ProtectedRoute accessToken={accessToken}>
                <OrderPage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}

const Main = styled.main`
  height: calc(100vh - 64px);
`;
