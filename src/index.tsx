import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadPromosAction, loadProductsAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { addProductInBasketData, setCurrentPage } from './store/app-process/app-process.slice';
import { setSortDirection, setSortType } from './store/sort-process/sort-process.slice';
import { setCategory, setType, setLevel, setMinPrice, setMaxPrice } from './store/filter-process/filter-process.slice';
import { ProductInBasket } from './types/types';

store.dispatch(loadProductsAction());
store.dispatch(loadPromosAction());

const productsInBasketString = localStorage.getItem('basketData');
if(productsInBasketString) {
  const productsInBasket = JSON.parse(productsInBasketString) as ProductInBasket[];
  productsInBasket.forEach((product) => {
    store.dispatch(addProductInBasketData(product));
  });
}

const searchParams = new URLSearchParams(location.search);
const page = searchParams.get('page');
const sortType = searchParams.get('sortType');
const sortDirection = searchParams.get('sortDirection');
const filterCategory = searchParams.get('filterCategory');
const filterType = searchParams.get('filterType');
const filterLevel = searchParams.get('filterLevel');
const minPrice = searchParams.get('minPrice');
const maxPrice = searchParams.get('maxPrice');

if(page) {
  store.dispatch(setCurrentPage(+page - 1));
}

if(sortDirection && sortType) {
  store.dispatch(setSortDirection(sortDirection));
  store.dispatch(setSortType(sortType));
}

if(filterCategory) {
  store.dispatch(setCategory(filterCategory));
}

if(filterType) {
  const typesArr = filterType.split(',');
  typesArr.forEach((type) => store.dispatch(setType(type)));
}

if(filterLevel) {
  const levelsArr = filterLevel.split(',');
  levelsArr.forEach((level) => store.dispatch(setLevel(level)));
}

if(minPrice) {
  store.dispatch(setMinPrice(minPrice));
}

if(maxPrice) {
  store.dispatch(setMaxPrice(maxPrice));
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
