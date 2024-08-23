import NavBar from './componentes/navbar/NavBar';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Footer from './componentes/footer/Footer';
import Polizas from './pages/polizas/Polizas';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id/poliza",
    element: <Polizas />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/admin",
    element: <Admin />,
  },
]);

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
