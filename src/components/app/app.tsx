import { Route, Routes } from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import ProductPage from '../../pages/product-page/product-page';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoutes } from '../../consts';
import BasketPage from '../../pages/basket-page/basket-page';

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoutes.Main}>
          <Route index element={<StartPage />} />
          <Route
            path={`${AppRoutes.Product}:id/:tab`}
            element={<ProductPage />}
          />
          <Route path={AppRoutes.Basket} element={<BasketPage />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
