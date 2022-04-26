import './assets/css/app.css';
import './assets/css/variables.css'
import './assets/css/responsive.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Dashboard from './pages/dashboard'
import NotFound from './pages/notFound'
import AddClient from './pages/addClient';
import AllClients from './pages/allClients';
import ClientPage from './pages/clientPage';
import { useMemo, useState } from 'react';
import InvestmentContext from './contexts/InvestmentContext';


function App() {

  const [refresh, setRefresh] = useState(false);
  const providerValue= useMemo(() => ({refresh, setRefresh}), [refresh, setRefresh])

  return (

    <BrowserRouter>
      <div className='app'>

        <InvestmentContext.Provider value={providerValue}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-client" element={<AddClient />} />
            <Route path="all-clients" element={<AllClients />} />
            <Route path="clients/:id" element={<ClientPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </InvestmentContext.Provider>

      </div>
    </BrowserRouter>

  );
}

export default App;
