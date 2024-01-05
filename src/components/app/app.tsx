import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import ProductPage from '../../pages/product-page/product-page';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<StartPage />}/>
            <Route path='/?page=:page' element={<StartPage />}/>
            <Route path='/product/:id/:tab' element={<ProductPage/>}/>
            <Route path='*' element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
