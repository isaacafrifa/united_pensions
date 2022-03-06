import './assets/css/app.css';
import './assets/css/variables.css'
import './assets/css/responsive.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Dashboard from './pages/dashboard'
import NotFound from './pages/notFound'
import AddClient from './pages/addClient';
import AllClients from './pages/allClients';

function App() {
  return (

    <BrowserRouter>
      <div className='app'>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-client" element={<AddClient />} />
          <Route path="all-clients" element={<AllClients />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
