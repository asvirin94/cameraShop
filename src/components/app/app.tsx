import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<StartPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
