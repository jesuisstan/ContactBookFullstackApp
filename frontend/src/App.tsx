import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home.page';
import ContactBook from './components/ContactBook/ContactBook';
import NotFound from './pages/NotFound.page';
import axios from 'axios';
import User from './types/User';
import './styles/index.css';

const url = 'http://localhost:9999/auth/getuser';

const App = () => {
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    avatar: '',
    provider: ''
  });

  useEffect(() => {
    axios.get(url).then(
      (response) => {
        setUser(response.data);
      },
      (error) => {
        console.log('no user');
      }
    );
  }, []);

  user ? console.log('user is') : console.log('no user');
  console.log(user);

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
