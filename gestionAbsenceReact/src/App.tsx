import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import EtudiantList from './pages/EtudiantList';
import EtudiantAdd from './pages/EtudiantAdd';
import EtudiantEdit from './pages/EtudiantEdit';
import EtudiantDetail from './pages/EtudiantDetail';
import Blacklist from './pages/Blacklist';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/etudiants" element={<EtudiantList />} />
          <Route path="/etudiants/add" element={<EtudiantAdd />} />
          <Route path="/etudiants/:id" element={<EtudiantDetail />} />
          <Route path="/etudiants/:id/edit" element={<EtudiantEdit />} />
          <Route path="/blacklist" element={<Blacklist />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
