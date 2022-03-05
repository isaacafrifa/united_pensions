import './assets/css/app.css';
import './assets/css/variables.css'
import './assets/css/responsive.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Dashboard from './pages/dashboard'
import NotFound from './pages/notFound'

function App() {
  return (
   
    <BrowserRouter>
     <div className='app'>

      <Routes>   
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} /> 

      </Routes>
      </div>
    </BrowserRouter> 

  );
}

export default App;
