import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadPromosAction, loadProductsAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

store.dispatch(loadProductsAction());
store.dispatch(loadPromosAction());

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
