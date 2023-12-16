import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage />}>
          <Route path='?page=:page' element={<StartPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
