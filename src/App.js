import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './styles/common.css'
import './styles/theme.css'
import { Box } from '@mui/material';
import Navigation from './components/navigation';
import Home from './pages/home';
import Books from "./pages/books";
import ReadBook from "./pages/readBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/:category" element={<Books />} />
          <Route path="readbook" element={<ReadBook />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
