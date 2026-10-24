import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CentersPage from './pages/CentersPage.jsx';
import AddPage from './pages/AddPage.jsx';
import FindPage from './pages/FindPage.jsx';
import UpdatePage from './pages/UpdatePage.jsx';
import DeletePage from './pages/DeletePage.jsx';

export default function App() {
  return <Routes><Route element={<Layout />}><Route index element={<Dashboard />} /><Route path="centers" element={<CentersPage />} /><Route path="add" element={<AddPage />} /><Route path="find" element={<FindPage />} /><Route path="update" element={<UpdatePage />} /><Route path="delete" element={<DeletePage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes>;
}
