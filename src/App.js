import {NotFound} from './containers/notFound.jsx'
import {Main} from './containers/main'
import {Find} from './containers/find'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/find' exact element={<Find />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
