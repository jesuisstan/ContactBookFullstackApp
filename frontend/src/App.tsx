import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.page';
import ContactBook from './components/ContactBook/ContactBook';
import NotFound from './pages/NotFound.page';
import { User } from './types/User';
import * as utils from './utils/contactsHandlers';
import './styles/index.css';
import MainLayout from './components/Layout/MainLayout';

const App = () => {
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    avatar: '',
    provider: ''
  });

  useEffect(() => {
    utils.getUserData(setUser);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout user={user} />}>
            <Route index={true} element={<Home />} />
            <Route path="contactbook" element={<ContactBook user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
