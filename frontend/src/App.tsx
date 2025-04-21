// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EntertainerListPage from './pages/EntertainerListPage';
import AddEntertainerPage from './pages/AddEntertainerPage';
import EditEntertainerPage from './pages/EditEntertainerPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entertainers/" element={<EntertainerListPage />} />
        <Route path="/add-entertainer" element={<AddEntertainerPage />} />
        <Route
          path="/entertainers/:id/edit"
          element={<EditEntertainerPage />}
        />
        <Route path="/entertainers/:id" element={<EntertainerDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
