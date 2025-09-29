import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { Dashboard, LoginPage, SignupPage } from './pages';
import { ConfirmEmailPage } from './pages/ConfirmEmail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/confirm-email" element={<ConfirmEmailPage />} />
      <Route path="/dashboard" element={<Navbar />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
