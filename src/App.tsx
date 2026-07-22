import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navbar } from './components/Navbar';
import { MascotasListPage } from './pages/MascotasListPage';
import { MascotaDetailPage } from './pages/MascotaDetailPage';
import { MascotaFormPage } from './pages/MascotaFormPage';


export const App: React.FC = () => {

  return (
    <Router>
      <Navbar />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<MascotasListPage />} />
          <Route path="/mascotas/:id" element={<MascotaDetailPage />} />
          <Route path="/crear" element={<MascotaFormPage />} />
          <Route path="*" element={<h2 className="text-center text-danger my-5">404 - Página no encontrada</h2>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
