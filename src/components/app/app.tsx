import { Route, Routes } from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import ProductPage from '../../pages/product-page/product-page';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoutes } from '../../consts';

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoutes.Main}>
          <Route index element={<StartPage />} />
          <Route path="/?page=:page" element={<StartPage />} />
          <Route
            path={`${AppRoutes.Product}:id/:tab`}
            element={<ProductPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
