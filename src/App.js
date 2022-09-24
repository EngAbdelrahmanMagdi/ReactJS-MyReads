import {NotFound} from './components/notFound.js'
import {Main} from './components/main'
import {Search} from './components/search'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/search' exact element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
