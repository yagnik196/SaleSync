import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Approutes from "./Routes/Routes"
import './App.css';
import { AuthProvider } from './Contex/Authcontext';
import Navbar from './components/reusables/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          {Approutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

